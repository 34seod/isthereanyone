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
    nickName: string
  }
};

type ICECandidate = {
  id: string | null
  type: string
  label: number | null | undefined
  candidate: string
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
  setLock: Dispatch<SetStateAction<boolean>>
) => {
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();
  const senderRef = useRef<RTCRtpSender[]>([]);
  const localStreamRef = useRef<MediaStream>();
  const peersRef = useRef<PeerConnection>({});
  const localVideoRef = useRef<HTMLVideoElement | null | undefined>(null);
  const { isMuted, isRecording, nickName } = roomState;

  const setSocket = (socket: SocketIO) => {
    socketRef.current = socket;
  };

  const getStream = (ref: RefObject<HTMLVideoElement> | null) => {
    socketRef.current?.emit('create or join', roomId, nickName);
    localVideoRef.current = ref?.current;
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    }).then(gotStream);
  };

  const gotStream = (stream: MediaStream) => {
    localStreamRef.current = stream;
    if (isMuted) handleMute();
    if (isRecording) handleScreen();
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
      sendMessageRTC('got user media');
    }
  };

  const sendMessageRTC = (message: string) => {
    socketRef.current?.emit('message', message, nickName);
  };

  const sendMessageRTCTo = (
    socketId: string,
    message: RTCSessionDescriptionInit | RTCSdpType | ICECandidate
  ) => {
    socketRef.current?.emit('messageTo', socketId, message, nickName);
  };

  const maybeStart = (socketId: string) => {
    if (!peersRef.current[socketId].isStarted && typeof localStreamRef.current !== 'undefined' && peersRef.current[socketId].isChannelReady) {
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
      pc.ontrack = (event) => 
        handleRemoteStreamAdded(event as RTCTrackEvent, socketId);
      peersRef.current[socketId].pc = pc;
      return pc;
    } catch (e) {
      console.log('Failed to create PeerConnection, exception: ', e.message);
      return undefined;
    }
  };

  const handleRemoteStreamAdded = (
    event: RTCTrackEvent, socketId: string
  ) => {
    setVideoSrces((prev) => {
      const prevData = prev.filter((p) => p.socketId === socketId);
      if (prevData.length === 0) {
        return [
          ...prev, { socketId, nickName: peersRef.current[socketId].nickName }
        ];
      }

      return [...prev];
    });

    const remoteVideo: HTMLVideoElement | null = document.querySelector(`#remoteVideo-${socketId}`);
    if (remoteVideo) remoteVideo.srcObject = event.streams[0];
  };

  const handleIceCandidate = (
    event: RTCPeerConnectionIceEvent, socketId: string
  ) => {
    // console.log('icecandidate event: ', event);
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

  const handleCreateOfferError = (error: Error) => {
    console.log('createOffer() error: ', error);
  };

  const doCall = (socketId: string) => {
    peersRef.current[socketId]?.pc?.createOffer().then((offer) => {
      setLocalAndSendMessage(offer, socketId);
    }).catch((error) => handleCreateOfferError(error));
  };

  const doAnswer = (socketId: string) => {
    peersRef.current[socketId]?.pc?.createAnswer().then((answer) => {
      setLocalAndSendMessage(answer, socketId);
    }).catch((error: Error) => onCreateSessionDescriptionError(error));
  };

  const setLocalAndSendMessage = (
    sessionDescription: RTCSessionDescriptionInit,
    socketId: string
  ) => {
    peersRef.current[socketId]?.pc?.setLocalDescription(sessionDescription);
    sendMessageRTCTo(socketId, sessionDescription);
  };

  const onCreateSessionDescriptionError = (error: Error) => {
    console.log('Failed to create session description: ', error.toString());
  };

  const peerConnectOn = () => {
    socketRef.current?.on('lock', (isLock: boolean) => {
      setLock(isLock);
    });

    socketRef.current?.on('full', () => {
      window.location.href = '/';
    });

    socketRef.current?.on('join',  (room: string, socketId: string, otherNickName: string)=> {
      peersRef.current[socketId] = {
        pc: undefined,
        isStarted: false,
        isChannelReady: true,
        isInitiator: true,
        nickName: otherNickName
      };
    });

    socketRef.current?.on('message', (socketId: string, message: RTCSessionDescriptionInit | ICECandidate, otherNickName: string) => {
      if (!peersRef.current[socketId]) {
        peersRef.current[socketId] = {
          pc: undefined,
          isStarted: false,
          isChannelReady: true,
          isInitiator: false,
          nickName: otherNickName
        };
      }

      console.log(message?.type);
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
        const candidate = new RTCIceCandidate({
          sdpMLineIndex: message.label,
          candidate: message.candidate
        });
        peersRef.current[socketId]?.pc?.addIceCandidate(candidate);
      } else if (message.type === 'bye' && peersRef.current[socketId].isStarted) {
        handleRemoteHangup(socketId || '');
      }
    });
  };

  const handleRemoteHangup = (socketId: string) => {
    connectStop(socketId);
  };

  const connectStop = (socketId: string) => {
    peersRef.current[socketId]?.pc?.close();
    delete peersRef.current[socketId];
    setVideoSrces((prev) => prev.filter((e) => e.socketId !== socketId));
  };

  // const hangup = () => {
  //   if (localStreamRef.current) {
  //     localStreamRef.current.getTracks().forEach(track => track.stop());
  //   }
  // };

  const handleMute = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
  };

  const handleScreen = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
  };

  const handleLock = () => {
    socketRef.current?.emit('lock');
  };

  return {
    getStream,
    setSocket,
    peerConnectOn,
    handleMute,
    handleScreen,
    handleLock
  };
};

export default usePeer;
