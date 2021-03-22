/* eslint-disable react/no-array-index-key */

import React, { useState, ChangeEvent } from 'react';
import './Chat.css';

type Props = {
  roomId: string,
  messages: Message[],
  sendMessage: (newMessage: string) => void
};

type Message = {
  ownedByCurrentUser: string
  body: string
  senderId: string
};

const Chat = ({ roomId, messages, sendMessage }: Props) => {
  const [newMessage, setNewMessage] = useState(''); // Message to be sent

  const handleNewMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
