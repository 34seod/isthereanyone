import { useState, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { formatDate, Message } from '../types';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';

const useChat = () => {
  const [messages, setMessages] = useState<Message[] | []>([]);
  const newMsgSoundRef = useRef(new Audio('./new_msg.wav'));

  const newChatMessageOn = (socket: Socket) => {
    socket.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message?.senderId === socket.id
      };
      setMessages((prevMessages) => {
        if (!incomingMessage.ownedByCurrentUser) {
          newMsgSoundRef.current.play();
        }
        return [...prevMessages, incomingMessage];
      });
    });
  };

  const sendMessageSocket = (
    socket: Socket,
    messageBody: string,
    nickname: string
  ) => {
    socket.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socket.id,
      sendedAt: formatDate(new Date()),
      nickname
    });
  };

  return { messages, sendMessageSocket, newChatMessageOn };
};

export default useChat;
