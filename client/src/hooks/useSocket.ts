/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Socket, io } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { changeLock, updateVideoSrces } from '../store/actionCreators';
import useChat from './useChat';
import usePeer from './usePeer';

const SOCKET_SERVER_URL = process.env.REACT_APP_SERVER || 'http://localhost:4000';

const useSocket = (roomId: string) => {
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>(io());
  const { sendMessageSocket, newChatMessageOn } = useChat();
  const dispatch = useDispatch();
  const {
    start,
    setSocket,
    peerConnectOn,
    handleMute,
    handleScreen,
    handleScreenShare,
    stopCapture
  } = usePeer(roomId);

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    newChatMessageOn(socketRef.current);
    setSocket(socketRef.current);
    peerConnectOn();
    socketRef.current.on('lock', (isLock: boolean) => dispatch(changeLock(isLock)));
    socketRef.current.on('roomStateShare', (socketId: string, nickname: string, isCameraOn: boolean, isMikeOn: boolean) => {
      dispatch(updateVideoSrces({ socketId, nickname, isCameraOn, isMikeOn }));
    });
    socketRef.current.on('full', () => {
      window.location.href = '/?locked=true';
    });

    return () => {
      socketRef?.current?.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody: string, nickname: string) => {
    sendMessageSocket(socketRef.current, messageBody, nickname);
  };

  const handleLock = () => socketRef.current.emit('lock');

  return {
    sendMessage,
    start,
    handleMute,
    handleScreen,
    handleLock,
    handleScreenShare,
    stopCapture
  };
};

export default useSocket;
