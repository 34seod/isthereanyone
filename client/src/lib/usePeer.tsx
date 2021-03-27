/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import { useRef, Dispatch, SetStateAction, RefObject } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { RoomState, VideoSrc } from '../types';

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

const pcConfig = {
  'iceServers': [
    { 'urls':'stun:stun.l.google.com:19302' },
    {
      'urls': [
        'turn:numb.viagenie.ca'
      ],
      'username': 'webrtc@live.com',
      'credential': 'muazkh'
    }
  ]
};

const usePeer = (
  roomId: string,
  roomState: RoomState,
  setVideoSrces: Dispatch<SetStateAction<VideoSrc[]>>,
  setLock: Dispatch<SetStateAction<boolean>>,
  setIsScreenShare: Dispatch<SetStateAction<boolean>>
) => {
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();
  const senderRef = useRef<RTCRtpSender[]>([]);
  const localStreamRef = useRef<MediaStream | null>(null);
  const screenShareStreamRef = useRef<MediaStream>(new MediaStream);
  const myRoomState = useRef<RoomState>({ ...roomState });
  const peersRef = useRef<PeerConnection>({});
  const localVideoRef = useRef<HTMLVideoElement | null | undefined>(null);

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

  const sendMessageRTCTo = (
    socketId: string,
    message: RTCSessionDescriptionInit | RTCSdpType | ICECandidate | RoomStateShare
  ) => {
    socketRef.current?.emit('messageTo', socketId, message, myRoomState.current.nickname);
  };

  const maybeStart = (socketId: string) => {
    if (!peersRef.current[socketId].isStarted && localStreamRef.current !== null && peersRef.current[socketId].isChannelReady) {
      const pc = createPeerConnection(socketId);
      localStreamRef.current.getTracks().forEach((track) => {
        if (localStreamRef.current) {
          const sender = pc?.addTrack(track, localStreamRef.current);
          if (sender !== undefined) {
            senderRef.current = [...senderRef.current, sender];
          }
        }
      });
      peersRef.current[socketId].isStarted = true;
      if (peersRef.current[socketId].isInitiator) {
        doCall(socketId);
      }
    }
  };

  const createPeerConnection = (socketId: string) => {
    try {
      const pc = new RTCPeerConnection(pcConfig);
      pc.onicecandidate = (event) => handleIceCandidate(event, socketId);
      pc.ontrack = (event) => handleRemoteStreamAdded(event as RTCTrackEvent, socketId);
      peersRef.current[socketId].pc = pc;
      return pc;
    } catch (e) {
      console.log('Failed to create PeerConnection, exception: ', e.message);
      return undefined;
    }
  };

  const handleRemoteStreamAdded = (event: RTCTrackEvent, socketId: string) => {
    setVideoSrces((prev) => {
      const prevData = prev.find((p) => p.socketId === socketId);
      if (!prevData) {
        return [ ...prev, {
          socketId,
          nickname: peersRef.current[socketId].nickname,
          isScreenOn: true,
          isVoiceOn: true,
        }];
      }
      return prev;
    });

    const remoteVideo: HTMLVideoElement | null = document.querySelector(`#remoteVideo-${socketId}`);
    if (remoteVideo) remoteVideo.srcObject = event.streams[0];
  };

  const handleIceCandidate = (event: RTCPeerConnectionIceEvent, socketId: string) => {
    if (event.candidate) {
      sendMessageRTCTo(socketId, {
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate
      });
    } else {
      peersRef.current[socketId].isInitiator = true;
    }
  };

  const doCall = (socketId: string) => {
    peersRef.current[socketId]?.pc?.createOffer().then((offer) => {
      setLocalAndSendMessage(offer, socketId);
    }).catch((error) => console.log('createOffer() error: ', error.toString()));
  };

  const doAnswer = (socketId: string) => {
    peersRef.current[socketId]?.pc?.createAnswer().then((answer) => {
      setLocalAndSendMessage(answer, socketId);
    }).catch((error: Error) => console.log('Failed to create session description: ', error.toString()));
  };

  const setLocalAndSendMessage = (
    sessionDescription: RTCSessionDescriptionInit,
    socketId: string
  ) => {
    peersRef.current[socketId]?.pc?.setLocalDescription(sessionDescription);
    sendMessageRTCTo(socketId, sessionDescription);
    sendMessageRTCTo(socketId, { type: 'roomStateShare', roomState: myRoomState.current });
  };

  const updateVideoSrces = (socketId: string, nickname: string, isScreenOn: boolean, isVoiceOn: boolean) => {
    setVideoSrces((prev) => {
      const tmp = prev.slice();
      const index = tmp.findIndex((p) => p.socketId === socketId);

      if (index > -1) {
        tmp.splice(index, 1, { ...tmp[index], isScreenOn, isVoiceOn });
        // tmp[index].isScreenOn = isScreenOn;
        // tmp[index].isVoiceOn = isVoiceOn;
      } else {
        const newData = { socketId, nickname, isScreenOn, isVoiceOn };
        tmp.push(newData);
      }

      return tmp;
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

      // console.log(message?.type);
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

  const handleRemoteHangup = (socketId: string) => {
    peersRef.current[socketId]?.pc?.close();
    delete peersRef.current[socketId];
    setVideoSrces((prev) => prev.filter((e) => e.socketId !== socketId));
  };

  // const hangup = () => {
  //   if (localStreamRef.current) {
  //     localStreamRef.current.getTracks().forEach(track => track.stop());
  //   }
  // };

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

  const handleScreenShare = () => {
    const mediaDevices = navigator.mediaDevices as any // eslint-disable-line
    mediaDevices.getDisplayMedia({ video: { cursor: 'always' }, audio: false })
      .then(handleScreenShareSuccess, handleScreenShareError);
  };

  const handleScreenShareError = (e: Error) => {
    setIsScreenShare(false);
    console.log('getDisplayMedia error: ', e.toString());
  };

  const handleScreenShareSuccess = (stream: MediaStream) => {
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;
    screenShareStreamRef.current = stream;
    senderRef.current.forEach((sender) => {
      if (sender?.track?.kind === 'video') {
        sender.replaceTrack(stream.getVideoTracks()[0]);
      }
    });

    stream.getVideoTracks()[0].addEventListener('ended', () => {
      stopCapture();
    });
  };

  const stopCapture = () => {
    senderRef.current.forEach((sender) => {
      if (sender?.track?.kind === 'video' && localStreamRef.current !== null) {
        sender.replaceTrack(localStreamRef.current.getVideoTracks()[0]);
      }
    });

    screenShareStreamRef.current.getTracks().forEach((track: MediaStreamTrack) => track.stop());
    if (localVideoRef.current) localVideoRef.current.srcObject = localStreamRef.current;
    setIsScreenShare(false);
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
