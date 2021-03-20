/* eslint-disable max-len */ f

import Socket, { io } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

const ENDPOINT = 'http://localhost:4000';

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

export default class Peer {
  static ROOM_ID: string;

  static localStream: MediaStream;

  private socket: Socket.Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

  private peers: PeerConnection = {};

  private mySocketId = '';

  private localVideo: HTMLVideoElement | null | undefined = null;

  constructor(roomId: string) {
    Peer.ROOM_ID = roomId;
    this.socket = io(ENDPOINT, { query: { roomId }, transports: ['websocket'] });
    // this.connect();
  }

  // getStream = (ref: React.RefObject<HTMLVideoElement> | null) => {
  //   console.log('getStream');
  //   this.localVideo = ref?.current;
  //   navigator.mediaDevices.getUserMedia({
  //     audio: false,
  //     video: true
  //   }).then(this.gotStream);
  // };

  // start = () => {
  //   this.sendMessage('got user media');
  // };

  // hangup = (socketId: string) => {
  //   console.log('Hanging up.');
  //   this.connectStop(socketId);
  //   this.sendMessage('bye');
  // };

  // private gotStream = (stream: MediaStream) => {
  //   console.log('Adding local stream.');
  //   Peer.localStream = stream;
  //   if (this.localVideo) {
  //     this.localVideo.srcObject = stream;
  //   }
  // };

  // private sendMessage = (message: string) => {
  //   console.log('Client sending message: ', message);
  //   console.log(this.socket);
  //   if (this.socket) this.socket?.emit('message', message);
  // };

  // private sendMessageTo = (socketId: string, message: RTCSessionDescriptionInit | RTCSdpType | ICECandidate) => {
  //   console.log('Client sending message: ', socketId, message);
  //   this.socket?.emit('messageTo', socketId, message);
  // };

  // private maybeStart = (socketId: string) => {
  //   console.log('>>>>>>> maybeStart() ', this.peers[socketId].isStarted, Peer.localStream, this.peers[socketId].isChannelReady);
  //   if (!this.peers[socketId].isStarted && typeof Peer.localStream !== 'undefined' && this.peers[socketId].isChannelReady) {
  //     console.log('>>>>>> creating peer connection');
  //     const pc = this.createPeerConnection(socketId);
  //     Peer.localStream.getTracks().forEach(track => pc?.addTrack(track, Peer.localStream));
  //     this.peers[socketId].isStarted = true;
  //     console.log('isInitiator', this.peers[socketId].isInitiator);
  //     if (this.peers[socketId].isInitiator) {
  //       this.doCall(socketId);
  //     }
  //   }
  // };

  // private createPeerConnection = (socketId: string) => {
  //   try {
  //     const pc = new RTCPeerConnection();
  //     // pc.onicecandidate = handleIceCandidate;
  //     pc.onicecandidate = (event) => this.handleIceCandidate(event, socketId);
  //     pc.addEventListener('addstream', (event) => this.handleRemoteStreamAdded(event as MediaStreamEvent, socketId));
  //     pc.addEventListener('onremovestream', this.handleRemoteStreamRemoved);
  //     console.log('Created RTCPeerConnnection');
  //     this.peers[socketId].pc = pc;
  //     return pc;
  //   } catch (e) {
  //     console.log('Failed to create PeerConnection, exception: ', e.message);
  //     alert('Cannot create RTCPeerConnection object.');
  //     return undefined;
  //   }
  // };


  // private handleRemoteStreamAdded = (event: MediaStreamEvent, socketId: string) => {
  //   console.log('Remote stream added.');
  //   const element = document.getElementById('remote');
  //   element?.insertAdjacentHTML('beforeend', `<video id='remoteVideo-${socketId}' autoplay playsinline></video>`);
  //   const remoteVideo: HTMLVideoElement | null = document.querySelector(`#remoteVideo-${socketId}`);
  //   if (remoteVideo) remoteVideo.srcObject = event.stream;
  // };

  // private handleRemoteStreamRemoved = (e: Event) => {
  //   console.log('Remote stream removed. Event: ', e.toString());
  // };

  // private handleIceCandidate = (event: RTCPeerConnectionIceEvent, socketId: string) => {
  //   console.log('icecandidate event: ', event);
  //   if (event.candidate) {
  //     this.sendMessageTo(socketId, {
  //       type: 'candidate',
  //       label: event.candidate.sdpMLineIndex,
  //       id: event.candidate.sdpMid,
  //       candidate: event.candidate.candidate
  //     });
  //   } else {
  //     this.peers[socketId].isInitiator = true;
  //     console.log('End of candidates.', this.peers[socketId].isInitiator);
  //   }
  // };

  // private handleCreateOfferError = (error: Error) => {
  //   console.log('createOffer() error: ', error);
  // };

  // private doCall = (socketId: string) => {
  //   console.log('Sending offer to peer');
  //   this.peers[socketId]?.pc?.createOffer().then((offer) => {
  //     this.setLocalAndSendMessage(offer, socketId);
  //   }).catch((error) => this.handleCreateOfferError(error));
  // };

  // private doAnswer = (socketId: string) => {
  //   console.log('Sending answer to peer.');
  //   this.peers[socketId]?.pc?.createAnswer().then((answer) => {
  //     this.setLocalAndSendMessage(answer, socketId);
  //   }).catch((error: Error) => this.onCreateSessionDescriptionError(error));
  // };

  // private setLocalAndSendMessage = (sessionDescription: RTCSessionDescriptionInit, socketId: string) => {
  //   this.peers[socketId]?.pc?.setLocalDescription(sessionDescription);
  //   console.log('setLocalAndSendMessage sending message', sessionDescription);
  //   this.sendMessageTo(socketId, sessionDescription);
  // };

  // private onCreateSessionDescriptionError = (error: Error) => {
  //   console.log('Failed to create session description: ', error.toString());
  // };

  // private connect = () => {
  //   if (Peer.ROOM_ID !== '') {
  //     this.socket?.emit('create or join', Peer.ROOM_ID);
  //     console.log('Attempted to create or join room', Peer.ROOM_ID);
  //   }

  //   this.socket?.on('created', (room: string, socketId: string) => {
  //     console.log('Created room ', room);
  //     this.mySocketId = socketId;
  //   });

  //   this.socket?.on('full', (room: string) => {
  //     console.log('Room ', room, ' is full');
  //   });

  //   this.socket?.on('join',  (room: string, socketId: string)=> {
  //     console.log('Another peer made a request to join room ', room);
  //     console.log('This peer is the initiator of room ', room, '!');
  //     this.peers[socketId] = {
  //       pc: undefined, isStarted: false, isChannelReady: true, isInitiator: true
  //     };
  //   });

  //   this.socket?.on('joined', (room: string, socketId: string) => {
  //     console.log('joined: ', room);
  //     this.mySocketId = socketId;
  //   });

  //   this.socket?.on('log', (array: []) => {
  //     console.log(...array);
  //   });

  //   this.socket?.on('message', (socketId: string, message: RTCSessionDescriptionInit | ICECandidate) => {
  //     if (!this.peers[socketId]) {
  //       this.peers[socketId] = {
  //         pc: undefined, isStarted: false, isChannelReady: true, isInitiator: false
  //       };
  //     }

  //     console.log('Client received message:', socketId, message);
  //     if (message === 'got user media') {
  //       this.maybeStart(socketId);
  //     } else if (message.type === 'offer' && !this.peers[socketId].isInitiator) {
  //       if (!this.peers[socketId].isStarted) {
  //         this.maybeStart(socketId);
  //       }
  //       const newSDP = new RTCSessionDescription(message as RTCSessionDescriptionInit);
  //       this.peers[socketId]?.pc?.setRemoteDescription(newSDP);
  //       this.doAnswer(socketId);
  //     } else if (message.type === 'answer' && this.peers[socketId].isStarted) {
  //       const newSDP = new RTCSessionDescription(message as RTCSessionDescriptionInit);
  //       this.peers[socketId]?.pc?.setRemoteDescription(newSDP);
  //     } else if (message.type === 'candidate' && this.peers[socketId].isStarted) {
  //       const candidate = new RTCIceCandidate({
  //         sdpMLineIndex: message.label,
  //         candidate: message.candidate
  //       });
  //       this.peers[socketId]?.pc?.addIceCandidate(candidate);
  //     } else if (message.type === 'bye' && this.peers[socketId].isStarted) {
  //       this.handleRemoteHangup(message.id || '');
  //     }
  //   });
  // };

  // private handleRemoteHangup = (socketId: string) => {
  //   console.log('Session terminated.');
  //   this.connectStop(socketId);
  // };

  // private connectStop = (socketId: string) => {
  //   this.peers[socketId]?.pc?.close();
  //   const remote = document.getElementById(`remoteVideo-${socketId}`);
  //   if (remote) remote.remove();
  //   delete this.peers[socketId];
  // };
}
