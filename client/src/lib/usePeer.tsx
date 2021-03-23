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
  setVideoSrces: Dispatch<SetStateAction<VideoSrc[]>>
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
    localVideoRef.current = ref?.current;
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    }).then(gotStream);
  };

  const gotStream = (stream: MediaStream) => {
    console.log('Adding local stream.');
    localStreamRef.current = stream;
    if (isMuted) handleMute();
    if (isRecording) handleScreen();
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
      start();
    }
  };

  const sendMessageRTC = (message: string) => {
    console.log('Client sending message: ', message);
    socketRef.current?.emit('message', message, nickName);
  };

  const sendMessageRTCTo = (
    socketId: string,
    message: RTCSessionDescriptionInit | RTCSdpType | ICECandidate
  ) => {
    console.log('Client sending message To: ', socketId, message);
    socketRef.current?.emit('messageTo', socketId, message, nickName);
  };

  const maybeStart = (socketId: string) => {

    console.log('>>>>>>> maybeStart() ', peersRef.current[socketId].isStarted, peersRef.current[socketId].isChannelReady);
    if (!peersRef.current[socketId].isStarted && typeof localStreamRef.current !== 'undefined' && peersRef.current[socketId].isChannelReady) {
      console.log('>>>>>> creating peer connection');
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
      console.log('isInitiator', peersRef.current[socketId].isInitiator);
      if (peersRef.current[socketId].isInitiator) {
        doCall(socketId);
      }
    }
  };

  const createPeerConnection = (socketId: string) => {
    try {
      const pc = new RTCPeerConnection(pcConfig);
      pc.onicecandidate = (event) => handleIceCandidate(event, socketId);
      pc.addEventListener('addstream', (event) => handleRemoteStreamAdded(event as MediaStreamEvent, socketId));
      pc.addEventListener('onremovestream', handleRemoteStreamRemoved);
      console.log('Created RTCPeerConnnection');
      peersRef.current[socketId].pc = pc;
      return pc;
    } catch (e) {
      console.log('Failed to create PeerConnection, exception: ', e.message);
      alert('Cannot create RTCPeerConnection object.');
      return undefined;
    }
  };


  const handleRemoteStreamAdded = (
    event: MediaStreamEvent, socketId: string
  ) => {
    console.log('Remote stream added.');
    setVideoSrces((prev) =>
      [...prev, { socketId, nickName: peersRef.current[socketId].nickName }]);

    const remoteVideo: HTMLVideoElement | null = document.querySelector(`#remoteVideo-${socketId}`);
    if (remoteVideo) remoteVideo.srcObject = event.stream;
  };

  const handleRemoteStreamRemoved = (e: Event) => {
    console.log('Remote stream removed. Event: ', e.toString());
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
      console.log(peersRef.current);
      peersRef.current[socketId].isInitiator = true;
      console.log('End of candidates.', peersRef.current[socketId].isInitiator);
    }
  };

  const handleCreateOfferError = (error: Error) => {
    console.log('createOffer() error: ', error);
  };

  const doCall = (socketId: string) => {
    console.log('Sending offer to peer');
    peersRef.current[socketId]?.pc?.createOffer().then((offer) => {
      setLocalAndSendMessage(offer, socketId);
    }).catch((error) => handleCreateOfferError(error));
  };

  const doAnswer = (socketId: string) => {
    console.log('Sending answer to peer.');
    peersRef.current[socketId]?.pc?.createAnswer().then((answer) => {
      setLocalAndSendMessage(answer, socketId);
    }).catch((error: Error) => onCreateSessionDescriptionError(error));
  };

  const setLocalAndSendMessage = (
    sessionDescription: RTCSessionDescriptionInit,
    socketId: string
  ) => {
    peersRef.current[socketId]?.pc?.setLocalDescription(sessionDescription);
    console.log('setLocalAndSendMessage sending message', sessionDescription);
    sendMessageRTCTo(socketId, sessionDescription);
  };

  const onCreateSessionDescriptionError = (error: Error) => {
    console.log('Failed to create session description: ', error.toString());
  };

  const peerConnectOn = () => {
    socketRef.current?.on('full', (room: string) => {
      console.log('Room ', room, ' is full');
    });

    socketRef.current?.on('join',  (room: string, socketId: string, otherNickName: string)=> {
      console.log('Another peer made a request to join room ', room);
      console.log('This peer is the initiator of room ', room, '!');
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

      // console.log('Client received message:', socketId, message);
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
        handleRemoteHangup(message.id || '');
      }
    });
  };

  const handleRemoteHangup = (socketId: string) => {
    console.log('Session terminated.');
    connectStop(socketId);
  };

  const connectStop = (socketId: string) => {
    peersRef.current[socketId]?.pc?.close();
    setVideoSrces((prev) => prev.filter((e) => e.socketId === socketId));
    delete peersRef.current[socketId];
  };

  const start = () => {
    socketRef.current?.emit('create or join', roomId, nickName);
    console.log('Attempted to create or join room', roomId);
    sendMessageRTC('got user media');
  };

  const hangup = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
  };

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

  return {
    getStream,
    setSocket,
    hangup,
    peerConnectOn,
    handleMute,
    handleScreen
  };
};

export default usePeer;
