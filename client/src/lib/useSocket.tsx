/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState, Dispatch, SetStateAction } from 'react';
import Socket, { io } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { RoomState, VideoSrc } from '../types';
import useChat from './useChat';
import usePeer from './usePeer';

const SOCKET_SERVER_URL = process.env.REACT_APP_SERVER || 'http://localhost:4000';

const useSocket = (
  roomId: string,
  roomState: RoomState,
  setVideoSrces: Dispatch<SetStateAction<VideoSrc[]>>
) => {
  const socketRef = useRef<Socket.Socket<DefaultEventsMap, DefaultEventsMap>>();
  const { messages, sendMessageSocket, newChatMessageOn } = useChat();
  const {
    getStream,
    setSocket,
    peerConnectOn
  } = usePeer(roomId, roomState, setVideoSrces);

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    newChatMessageOn(socketRef.current);
    setSocket(socketRef.current);
    peerConnectOn();

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef?.current?.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody: string) => {
    sendMessageSocket(socketRef.current, messageBody);
  };

  return { messages, sendMessage, getStream };
};

export default useSocket;
