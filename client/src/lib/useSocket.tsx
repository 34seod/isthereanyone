/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import Socket, { io } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import useChat from './useChat';
import usePeer from './usePeer';

const SOCKET_SERVER_URL = 'http://localhost:4000';

const useSocket = (roomId: string) => {
  const socketRef = useRef<Socket.Socket<DefaultEventsMap, DefaultEventsMap>>();
  const { messages, sendMessageSocket, newChatMessageOn } = useChat();
  const {
    getStream,
    start,
    setSocket,
    hangup,
    peerConnectOn
  } = usePeer(roomId);

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

  return { messages, sendMessage, getStream, start, hangup };
};

export default useSocket;
