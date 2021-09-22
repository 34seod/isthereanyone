/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { useRef, RefObject } from 'react';
import { Socket } from 'socket.io-client';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import HandShake from './peer/HandShake';
import ScreenShare from './peer/ScreenShare';
import { changeIsCameraOn, changeIsMikeOn, changeLock, updateVideoSrces, removeVideoSrces } from '../store/actionCreators';

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

const usePeer = (roomId: string) => {
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();
  const senderRef = useRef<Sender>({});
  const screenShareRef = useRef<boolean>(false);
  const localStreamRef = useRef<MediaStream | null>(null);
  const screenShareStreamRef = useRef<MediaStream>(new MediaStream);
  const peersRef = useRef<PeerConnection>({});
  const localVideoRef = useRef<HTMLVideoElement | null | undefined>(null);
  const joinSoundRef = useRef(new Audio('./join.wav'));
  const dispatch = useDispatch();
  const { isCameraOn, isMikeOn, nickname } = useSelector((state: State) => state, shallowEqual);

  const { handleScreenShare, stopCapture } = ScreenShare(
    localVideoRef, senderRef, screenShareStreamRef, localStreamRef, screenShareRef
  );

  const { createPeerConnection, doCall, doAnswer } = HandShake(peersRef, socketRef, joinSoundRef);

  const setSocket = (socket: SocketIO) => {
    socketRef.current = socket;
  };

  const start = (ref: RefObject<HTMLVideoElement> | null) => {
    socketRef.current?.emit('create or join', roomId, nickname);
    localVideoRef.current = ref?.current;
  };

  const getStream = () => {
    navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      },
      video: true
    }).then(gotStream);
  };

  const gotStream = (stream: MediaStream) => {
    localStreamRef.current = stream;
    if (!isMikeOn) handleMute(isMikeOn, false);
    if (!isCameraOn) handleScreen(isCameraOn, false);
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
      sendMessageRTC('got user media');
    }
  };

  const sendMessageRTC = (message: string) => {
    socketRef.current?.emit('message', message, nickname);
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
    senderRef.current[socketId] = { audio: null, video: null };

    stream.getTracks().forEach((track) => {
      const sender = pc?.addTrack(track, stream);
      if (sender !== undefined) {
        senderRef.current[socketId][track.kind as 'audio' | 'video'] = sender;
      }
    });
  };

  const peerConnectOn = () => {
    socketRef.current?.on('lock', (isLock: boolean) => {
      dispatch(changeLock(isLock));
    });

    socketRef.current?.on('roomStateShare', (socketId: string, nicknameParam: string, isCameraOnParam: boolean, isMikeOnParam: boolean) => {
      const updateSrc = {
        socketId,
        nickname: nicknameParam,
        isCameraOn: isCameraOnParam,
        isMikeOn: isMikeOnParam
      };
      dispatch(updateVideoSrces(updateSrc));
    });

    socketRef.current?.on('full', () => {
      window.location.href = '/?locked=true';
    });

    socketRef.current?.on('getin', () => {
      getStream();
    });

    socketRef.current?.on('join', (socketId: string, nicknameParam: string)=> {
      peersRef.current[socketId] = {
        pc: undefined,
        isStarted: false,
        isChannelReady: true,
        isInitiator: true,
        nickname: nicknameParam
      };
    });

    socketRef.current?.on('message', (socketId: string, message: RTCSessionDescriptionInit | ICECandidate | RoomStateShare | 'got user media', nicknameParam: string) => {
      if (!peersRef.current[socketId]) {
        peersRef.current[socketId] = {
          pc: undefined,
          isStarted: false,
          isChannelReady: true,
          isInitiator: false,
          nickname: nicknameParam
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
        const updateSrc: VideoSrc = {
          socketId,
          nickname: msg.roomState.nickname,
          isCameraOn: msg.roomState.isCameraOn,
          isMikeOn: msg.roomState.isMikeOn
        };
        dispatch(updateVideoSrces(updateSrc));
      }
    });
  };

  const handleRemoteHangup = (socketId: string) => {
    peersRef.current[socketId]?.pc?.close();
    delete peersRef.current[socketId];
    delete senderRef.current[socketId];
    const removeSrc = { socketId, nickname: '', isCameraOn: false, isMikeOn: false };
    dispatch(removeVideoSrces(removeSrc));
  };

  const handleMute = (isMikeOnParam: boolean, doUpdate = true) => {
    if (localStreamRef.current) {
      dispatch(changeIsMikeOn(isMikeOnParam));
      localStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      if (doUpdate) socketRef.current?.emit('roomStateShare', nickname, isCameraOn, isMikeOnParam);
    }
  };

  const handleScreen = (isCameraOnParam: boolean, doUpdate = true) => {
    if (localStreamRef.current) {
      dispatch(changeIsCameraOn(isCameraOnParam));

      if (isCameraOnParam) {
        // 카메라 끌때 스트림을 종료했으므로 재연결한다.
        const newStream = navigator.mediaDevices.getUserMedia({ video: true });
        newStream.then((stream) => {
          stream.getVideoTracks().forEach((track) => {
            localStreamRef.current?.addTrack(track);
            Object.values(senderRef.current).forEach((sender) => {
              sender.video?.replaceTrack(track);
            });
          });
        });
      } else {
        localStreamRef.current.getVideoTracks().forEach((track) => {
          track.enabled = false;
          setTimeout(() => {
            track.stop();
            localStreamRef.current?.removeTrack(track);
          }, 500);
        });
      }

      if (doUpdate) socketRef.current?.emit('roomStateShare', nickname, isCameraOnParam, isMikeOn);
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
