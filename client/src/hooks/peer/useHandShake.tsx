/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import React, { useRef, Dispatch, SetStateAction, MutableRefObject } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { RoomState, VideoSrc } from '../../types';

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

const useHandShake = (
  setVideoSrces: Dispatch<SetStateAction<VideoSrc[]>>,
  peersRef: MutableRefObject<PeerConnection>,
  myRoomState: MutableRefObject<RoomState>,
  socketRef: MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap> | undefined>
) => {
  // const joinSoundRef = useRef(new Audio('./join.wav'));

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
        // joinSoundRef.current.play();
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
    }).catch((error: Error) => console.log('createOffer() error: ', error.toString()));
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

  const sendMessageRTCTo = (
    socketId: string,
    message: RTCSessionDescriptionInit | RTCSdpType | ICECandidate | RoomStateShare
  ) => {
    socketRef.current?.emit('messageTo', socketId, message, myRoomState.current.nickname);
  };
  return { createPeerConnection, doCall, doAnswer };
};

export default useHandShake;
