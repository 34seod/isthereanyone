/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { useRef, Dispatch, SetStateAction, RefObject } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { RoomState, Sender, VideoSrc } from '../types';
import handShake from './peer/handShake';
import screenShare from './peer/screenShare';

type PeerConnection = {
  [key: string]: {
    pc: RTCPeerConnection | undefined
    isInitiator: boolean
    isStarted: boolean
    isChannelReady: boolean
    nickname: string
  }
};

type ICECandidate = {
  id: string | null
  type: string
  label: number | null | undefined
  candidate: string
};

type RoomStateShare = {
  type: string
  roomState: RoomState
};

type SocketIO = Socket<DefaultEventsMap> | undefined;

const usePeer = (
  roomId: string,
  roomState: RoomState,
  setVideoSrces: Dispatch<SetStateAction<VideoSrc[]>>,
  setLock: Dispatch<SetStateAction<boolean>>,
  setIsScreenShare: Dispatch<SetStateAction<boolean>>
) => {
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();
  const senderRef = useRef<Sender>({});
  const screenShareRef = useRef<boolean>(false);
  const localStreamRef = useRef<MediaStream | null>(null);
  const screenShareStreamRef = useRef<MediaStream>(new MediaStream);
  const myRoomState = useRef<RoomState>({ ...roomState });
  const peersRef = useRef<PeerConnection>({});
  const localVideoRef = useRef<HTMLVideoElement | null | undefined>(null);
  const joinSoundRef = useRef(new Audio('./join.wav'));
  const { handleScreenShare, stopCapture } = screenShare(
    setIsScreenShare, localVideoRef, senderRef, screenShareStreamRef, localStreamRef, screenShareRef
  );

  const { createPeerConnection, doCall, doAnswer } = handShake(
    setVideoSrces, peersRef, myRoomState, socketRef, joinSoundRef
  );

  const setSocket = (socket: SocketIO) => {
    socketRef.current = socket;
  };

  const start = (ref: RefObject<HTMLVideoElement> | null) => {
    socketRef.current?.emit('create or join', roomId, myRoomState.current.nickname);
    localVideoRef.current = ref?.current;
  };

  const getStream = () => {
    navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      },
      video: true,
    }).then(gotStream);
  };

  const gotStream = (stream: MediaStream) => {
    localStreamRef.current = stream;
    if (!myRoomState.current.isVoiceOn) handleMute(myRoomState.current.isVoiceOn, false);
    if (!myRoomState.current.isScreenOn) handleScreen(myRoomState.current.isScreenOn, false);
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
      sendMessageRTC('got user media');
    }
  };

  const sendMessageRTC = (message: string) => {
    socketRef.current?.emit('message', message, myRoomState.current.nickname);
  };

  const maybeStart = (socketId: string) => {
    if (!peersRef.current[socketId].isStarted && localStreamRef.current !== null && peersRef.current[socketId].isChannelReady) {
      const pc = createPeerConnection(socketId);
      screenShareRef.current ? addTrack(pc, screenShareStreamRef.current, socketId) : addTrack(pc, localStreamRef.current, socketId);
      peersRef.current[socketId].isStarted = true;
      if (peersRef.current[socketId].isInitiator) {
        doCall(socketId);
      }
    }
  };

  const addTrack = (pc: RTCPeerConnection | undefined, stream: MediaStream, socketId: string) => {
    stream.getTracks().forEach((track) => {
      if (stream) {
        const sender = pc?.addTrack(track, stream);
        if (sender !== undefined) senderRef.current[socketId] = sender;
      }
    });
  };

  const peerConnectOn = () => {
    socketRef.current?.on('lock', (isLock: boolean) => {
      setLock(isLock);
    });

    socketRef.current?.on('roomStateShare', (socketId: string, nickname: string, isScreenOn: boolean, isVoiceOn: boolean) => {
      updateVideoSrces(socketId, nickname, isScreenOn, isVoiceOn);
    });

    socketRef.current?.on('full', () => {
      window.location.href = '/?locked=true';
    });

    socketRef.current?.on('getin', () => {
      getStream();
    });

    socketRef.current?.on('join', (socketId: string, nickname: string)=> {
      peersRef.current[socketId] = {
        pc: undefined,
        isStarted: false,
        isChannelReady: true,
        isInitiator: true,
        nickname
      };
    });

    socketRef.current?.on('message', (socketId: string, message: RTCSessionDescriptionInit | ICECandidate | RoomStateShare, nickname: string) => {
      if (!peersRef.current[socketId]) {
        peersRef.current[socketId] = {
          pc: undefined,
          isStarted: false,
          isChannelReady: true,
          isInitiator: false,
          nickname
        };
      }

      if (message === 'got user media') {
        maybeStart(socketId);
      } else if (message.type === 'offer' && !peersRef.current[socketId].isInitiator) {
        if (!peersRef.current[socketId].isStarted) {
          maybeStart(socketId);
        }
        const newSDP = new RTCSessionDescription(
          message as RTCSessionDescriptionInit);
        peersRef.current[socketId]?.pc?.setRemoteDescription(newSDP);
        doAnswer(socketId);
      } else if (message.type === 'answer' && peersRef.current[socketId].isStarted) {
        const newSDP = new RTCSessionDescription(
          message as RTCSessionDescriptionInit);
        peersRef.current[socketId]?.pc?.setRemoteDescription(newSDP);
      } else if (message.type === 'candidate' && peersRef.current[socketId].isStarted) {
        const msg = message as ICECandidate;
        const candidate = new RTCIceCandidate({
          sdpMLineIndex: msg.label,
          candidate: msg.candidate
        });
        peersRef.current[socketId]?.pc?.addIceCandidate(candidate);
      } else if (message.type === 'bye' && peersRef.current[socketId].isStarted) {
        handleRemoteHangup(socketId || '');
      } else if (message.type === 'roomStateShare') {
        const msg = message as RoomStateShare;
        updateVideoSrces(socketId, msg.roomState.nickname, msg.roomState.isScreenOn, msg.roomState.isVoiceOn);
      }
    });
  };

  const updateVideoSrces = (socketId: string, nickname: string, isScreenOn: boolean, isVoiceOn: boolean) => {
    setVideoSrces((prev) => {
      const tmp = prev.slice();
      const index = tmp.findIndex((p) => p.socketId === socketId);

      if (index > -1) {
        tmp.splice(index, 1, { ...tmp[index], isScreenOn, isVoiceOn });
      } else {
        const newData = { socketId, nickname, isScreenOn, isVoiceOn };
        tmp.push(newData);
      }
      return tmp;
    });
  };

  const handleRemoteHangup = (socketId: string) => {
    peersRef.current[socketId]?.pc?.close();
    delete peersRef.current[socketId];
    delete senderRef.current[socketId];

    setVideoSrces((prev) => prev.filter((e) => e.socketId !== socketId));
  };

  const handleMute = (isVoiceOn: boolean, doUpdate = true) => {
    if (localStreamRef.current) {
      myRoomState.current.isVoiceOn = isVoiceOn;
      localStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      if (doUpdate) socketRef.current?.emit('roomStateShare', myRoomState.current.nickname, myRoomState.current.isScreenOn, isVoiceOn);
    }
  };

  const handleScreen = (isScreenOn: boolean, doUpdate = true) => {
    if (localStreamRef.current) {
      myRoomState.current.isScreenOn = isScreenOn;
      localStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      if (doUpdate) socketRef.current?.emit('roomStateShare', myRoomState.current.nickname, isScreenOn, myRoomState.current.isVoiceOn);
    }
  };

  const handleLock = () => {
    socketRef.current?.emit('lock');
  };

  return {
    start,
    setSocket,
    peerConnectOn,
    handleMute,
    handleScreen,
    handleLock,
    handleScreenShare,
    stopCapture
  };
};

export default usePeer;
