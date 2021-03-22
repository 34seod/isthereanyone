/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useSocket from '../../lib/useSocket';
import { RoomState } from '../../types';
import './Chat.css';

type TParams = { roomId?: string | undefined };

type Message = {
  ownedByCurrentUser: string
  body: string
  senderId: string
};

const Chat = (props: RouteComponentProps<TParams>, roomState: RoomState) => {
  const { roomId } = props.match.params; // Gets roomId from URL
  const { messages, sendMessage } = useSocket(roomId || '', roomState); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(''); // Message to be sent

  const handleNewMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage('');
  };

  const list = () => {
    const ms: Message[] = messages;

    return (
      ms.map((message, i) => (
        <li
          key={i}
          className={`message-item ${
            message.ownedByCurrentUser ? 'my-message' : 'received-message'
          }`}
        >
          {message.body}
        </li>
      ))
    );
  };

  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room: {roomId}</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {list()}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button type="button" onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default Chat;
