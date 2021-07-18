/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { MutableRefObject } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { changeVideoSrces } from '../../store/actionCreators';

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

const HandShake = (
  peersRef: MutableRefObject<PeerConnection>,
  socketRef: MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap> | undefined>,
  joinSoundRef: MutableRefObject<HTMLAudioElement>
) => {
  const dispatch = useDispatch();
  const {
    isCameraOn, isMikeOn, nickname, isStarted, videoSrces
  } = useSelector((state: State) => state, shallowEqual);

  const createPeerConnection = (socketId: string) => {
    try {
      const pc = new RTCPeerConnection(pcConfig);
      pc.onicecandidate = (event) => handleIceCandidate(event, socketId);
      pc.ontrack = (event) => handleRemoteStreamAdded(event as RTCTrackEvent, socketId);
      peersRef.current[socketId].pc = pc;
      return pc;
    } catch (e) {
      // if (process.env.NODE_ENV === 'development') console.log('Failed to create PeerConnection, exception: ', e.message);
      return undefined;
    }
  };

  const handleRemoteStreamAdded = (event: RTCTrackEvent, socketId: string) => {
    const prevData = videoSrces.find((p) => p.socketId === socketId);
    if (!prevData) {
      joinSoundRef.current.play();
      const newVideoSrces = [ ...videoSrces, {
        socketId,
        nickname: peersRef.current[socketId].nickname,
        isCameraOn: true,
        isMikeOn: true,
      }];
      dispatch(changeVideoSrces(newVideoSrces));
    }

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
    }).catch((error: Error) => {
      // if (process.env.NODE_ENV === 'development') console.log('createOffer() error: ', error.toString());
    });
  };

  const doAnswer = (socketId: string) => {
    peersRef.current[socketId]?.pc?.createAnswer().then((answer) => {
      setLocalAndSendMessage(answer, socketId);
    }).catch((error: Error) => {
      // if (process.env.NODE_ENV === 'development') console.log('Failed to create session description: ', error.toString());
    });
  };

  const setLocalAndSendMessage = (
    sessionDescription: RTCSessionDescriptionInit,
    socketId: string
  ) => {
    peersRef.current[socketId]?.pc?.setLocalDescription(sessionDescription);
    sendMessageRTCTo(socketId, sessionDescription);

    const roomState: RoomState = { isCameraOn, isMikeOn, nickname, isStarted };
    sendMessageRTCTo(socketId, { type: 'roomStateShare', roomState });
  };

  const sendMessageRTCTo = (
    socketId: string,
    message: RTCSessionDescriptionInit | RTCSdpType | ICECandidate | RoomStateShare
  ) => {
    socketRef.current?.emit('messageTo', socketId, message, nickname);
  };
  return { createPeerConnection, doCall, doAnswer };
};

export default HandShake;
