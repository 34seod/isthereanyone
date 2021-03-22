/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import Socket, { io } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { RoomState } from '../types';
import useChat from './useChat';
import usePeer from './usePeer';

const SOCKET_SERVER_URL = process.env.REACT_APP_SERVER || 'http://localhost:4000';

const useSocket = (roomId: string, roomState: RoomState) => {
  const socketRef = useRef<Socket.Socket<DefaultEventsMap, DefaultEventsMap>>();
  const { messages, sendMessageSocket, newChatMessageOn } = useChat();
  const {
    getStream,
    setSocket,
    hangup,
    peerConnectOn
  } = usePeer(roomId, roomState);

  useEffect(() => {
    // Creates a WebSocket connection
    console.log(process.env.REACT_APP_SERVER);

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

  return { messages, sendMessage, getStream, hangup };
};

export default useSocket;
