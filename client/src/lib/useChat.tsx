import { useEffect, useRef, useState } from 'react';
import Socket, { io } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'; // Name of the event
const SOCKET_SERVER_URL = 'http://localhost:4000';

type Message = {
  ownedByCurrentUser: string
  body: string
  senderId: string
};

const useChat = (roomId: string) => {
  const [messages, setMessages] = useState<Message[] | []>([]); // Sent and received messages
  const socketRef = useRef<Socket.Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {

    // Creates a WebSocket connection
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      console.log(message);
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message?.senderId === socketRef?.current?.id,
      };
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef?.current?.disconnect();
    };
  }, [roomId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody: string) => {
    console.log('sendMessage', messageBody);

    const a = socketRef?.current?.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
    console.log(a);
  };

  return { messages, sendMessage };
};

export default useChat;
