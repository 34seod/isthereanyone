import { useRef } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

type PeerConnection = {
  [key: string]: {
    pc: RTCPeerConnection | undefined
    isInitiator: boolean
    isStarted: boolean
    isChannelReady: boolean
  }
};

type ICECandidate = {
  id: string | null
  type: string
  label: number | null | undefined
  candidate: string
};

type SocketIO = Socket<DefaultEventsMap> | undefined;

const usePeer = (roomId: string) => {
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();
  let localStream: MediaStream = new MediaStream;
  const peers: PeerConnection = {};
  let mySocketId = '';
  let localVideo: HTMLVideoElement | null | undefined = null;

  const setSocket = (socket: SocketIO) => {
    socketRef.current = socket;
  };

  const getStream = (ref: React.RefObject<HTMLVideoElement> | null) => {
    console.log('getStream');
    localVideo = ref?.current;
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    }).then(gotStream);
  };

  const gotStream = (stream: MediaStream) => {
    console.log('Adding local stream.');
    localStream = stream;
    if (localVideo) {
      localVideo.srcObject = stream;
    }
  };

  const sendMessageRTC = (message: string) => {
    console.log('Client sending message: ', message);
    socketRef.current?.emit('message', message);
  };

  const sendMessageRTCTo = (
    socketId: string,
    message: RTCSessionDescriptionInit | RTCSdpType | ICECandidate
  ) => {
    console.log('Client sending message To: ', socketId, message);
    socketRef.current?.emit('messageTo', socketId, message);
  };

  const maybeStart = (socketId: string) => {
    console.log('>>>>>>> maybeStart() ', peers[socketId].isStarted, localStream, peers[socketId].isChannelReady);
    if (!peers[socketId].isStarted && typeof localStream !== 'undefined' && peers[socketId].isChannelReady) {
      console.log('>>>>>> creating peer connection');
      const pc = createPeerConnection(socketId);
      localStream.getTracks().forEach((track) =>
        pc?.addTrack(track, localStream));
      peers[socketId].isStarted = true;
      console.log('isInitiator', peers[socketId].isInitiator);
      if (peers[socketId].isInitiator) {
        doCall(socketId);
      }
    }
  };

  const createPeerConnection = (socketId: string) => {
    try {
      const pc = new RTCPeerConnection();
      // pc.onicecandidate = handleIceCandidate;
      pc.onicecandidate = (event) => handleIceCandidate(event, socketId);
      pc.addEventListener('addstream', (event) => handleRemoteStreamAdded(event as MediaStreamEvent, socketId));
      pc.addEventListener('onremovestream', handleRemoteStreamRemoved);
      console.log('Created RTCPeerConnnection');
      peers[socketId].pc = pc;
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
    const element = document.getElementById('remote');
    element?.insertAdjacentHTML('beforeend', `<video id='remoteVideo-${socketId}' autoplay playsinline></video>`);
    const remoteVideo: HTMLVideoElement | null = document.querySelector(`#remoteVideo-${socketId}`);
    if (remoteVideo) remoteVideo.srcObject = event.stream;
  };

  const handleRemoteStreamRemoved = (e: Event) => {
    console.log('Remote stream removed. Event: ', e.toString());
  };

  const handleIceCandidate = (
    event: RTCPeerConnectionIceEvent, socketId: string
  ) => {
    console.log('icecandidate event: ', event);
    if (event.candidate) {
      sendMessageRTCTo(socketId, {
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate
      });
    } else {
      console.log(peers);
      peers[socketId].isInitiator = true;
      console.log('End of candidates.', peers[socketId].isInitiator);
    }
  };

  const handleCreateOfferError = (error: Error) => {
    console.log('createOffer() error: ', error);
  };

  const doCall = (socketId: string) => {
    console.log('Sending offer to peer');
    peers[socketId]?.pc?.createOffer().then((offer) => {
      setLocalAndSendMessage(offer, socketId);
    }).catch((error) => handleCreateOfferError(error));
  };

  const doAnswer = (socketId: string) => {
    console.log('Sending answer to peer.');
    peers[socketId]?.pc?.createAnswer().then((answer) => {
      setLocalAndSendMessage(answer, socketId);
    }).catch((error: Error) => onCreateSessionDescriptionError(error));
  };

  const setLocalAndSendMessage = (
    sessionDescription: RTCSessionDescriptionInit,
    socketId: string
  ) => {
    peers[socketId]?.pc?.setLocalDescription(sessionDescription);
    console.log('setLocalAndSendMessage sending message', sessionDescription);
    sendMessageRTCTo(socketId, sessionDescription);
  };

  const onCreateSessionDescriptionError = (error: Error) => {
    console.log('Failed to create session description: ', error.toString());
  };

  const peerConnectOn = () => {
    socketRef.current?.on('created', (room: string, socketId: string) => {
      console.log('Created room ', room);
      mySocketId = socketId;
    });

    socketRef.current?.on('full', (room: string) => {
      console.log('Room ', room, ' is full');
    });

    socketRef.current?.on('join',  (room: string, socketId: string)=> {
      console.log('Another peer made a request to join room ', room);
      console.log('This peer is the initiator of room ', room, '!');
      peers[socketId] = {
        pc: undefined, isStarted: false, isChannelReady: true, isInitiator: true
      };
    });

    socketRef.current?.on('joined', (room: string, socketId: string) => {
      console.log('joined: ', room);
      mySocketId = socketId;
    });

    socketRef.current?.on('log', (array: []) => {
      console.log(...array);
    });

    socketRef.current?.on('message', (socketId: string, message: RTCSessionDescriptionInit | ICECandidate) => {
      if (!peers[socketId]) {
        peers[socketId] = {
          pc: undefined,
          isStarted: false,
          isChannelReady: true,
          isInitiator: false
        };
      }

      console.log('Client received message:', socketId, message);
      if (message === 'got user media') {
        maybeStart(socketId);
      } else if (message.type === 'offer' && !peers[socketId].isInitiator) {
        if (!peers[socketId].isStarted) {
          maybeStart(socketId);
        }
        const newSDP = new RTCSessionDescription(
          message as RTCSessionDescriptionInit);
        peers[socketId]?.pc?.setRemoteDescription(newSDP);
        doAnswer(socketId);
      } else if (message.type === 'answer' && peers[socketId].isStarted) {
        const newSDP = new RTCSessionDescription(
          message as RTCSessionDescriptionInit);
        peers[socketId]?.pc?.setRemoteDescription(newSDP);
      } else if (message.type === 'candidate' && peers[socketId].isStarted) {
        const candidate = new RTCIceCandidate({
          sdpMLineIndex: message.label,
          candidate: message.candidate
        });
        peers[socketId]?.pc?.addIceCandidate(candidate);
      } else if (message.type === 'bye' && peers[socketId].isStarted) {
        handleRemoteHangup(message.id || '');
      }
    });
  };

  const handleRemoteHangup = (socketId: string) => {
    console.log('Session terminated.');
    connectStop(socketId);
  };

  const connectStop = (socketId: string) => {
    peers[socketId]?.pc?.close();
    const remote = document.getElementById(`remoteVideo-${socketId}`);
    if (remote) remote.remove();
    delete peers[socketId];
  };

  const start = () => {
    socketRef.current?.emit('create or join', roomId);
    console.log('Attempted to create or join room', roomId);
    sendMessageRTC('got user media');
  };

  const hangup = (socketId: string) => {
    console.log('Hanging up.');
    connectStop(socketId);
    sendMessageRTC('bye');
  };

  return {
    getStream,
    start,
    setSocket,
    hangup,
    peerConnectOn
  };
};

export default usePeer;
