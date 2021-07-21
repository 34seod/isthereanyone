import { useRef } from 'react';
import { Socket } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { formatDate } from '../sharedFunctions';
import { addMessage } from '../store/actionCreators';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';

const useChat = () => {
  const newMsgSoundRef = useRef(new Audio('./new_msg.wav'));
  const dispatch = useDispatch();

  const newChatMessageOn = (socket: Socket) => {
    socket.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage: Message = {
        ...message,
        ownedByCurrentUser: message?.senderId === socket.id
      };

      if (!incomingMessage.ownedByCurrentUser) {
        newMsgSoundRef.current.play();
      }

      dispatch(addMessage(incomingMessage));
    });
  };

  const sendMessageSocket = (
    socket: Socket,
    messageBody: string,
    nickname: string
  ) => {
    const sendMessage = {
      body: messageBody,
      senderId: socket.id,
      sendedAt: formatDate(new Date()),
      nickname
    };
    dispatch(addMessage({ ...sendMessage, ownedByCurrentUser: true }));
    socket.emit(NEW_CHAT_MESSAGE_EVENT, sendMessage);
  };

  return { sendMessageSocket, newChatMessageOn };
};

export default useChat;
