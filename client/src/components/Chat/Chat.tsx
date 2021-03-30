/* eslint-disable react/no-array-index-key */

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { KeyboardEvent, useState, ChangeEvent, Dispatch, SetStateAction, useRef, useEffect } from 'react';
import useDraggable from '../../hooks/useDraggable';
import { Message } from '../../types';
import './Chat.css';

type Props = {
  showMessage: boolean
  nickname: string,
  messages: Message[],
  sendMessage: (newMessage: string, nickname: string) => void,
  setShowMessage: Dispatch<SetStateAction<boolean>>
};

const Chat = ({
  showMessage,
  nickname,
  messages,
  sendMessage,
  setShowMessage
}: Props) => {
  const [newMessage, setNewMessage] = useState('');
  const chatRef = useRef(document.createElement('div'));
  const chatheaderRef = useRef(document.createElement('div'));
  const chatBodyRef = useRef(document.createElement('div'));
  const closeRef = useRef(document.createElement('button'));
  const { dragElement, setDefault } = useDraggable(chatRef, chatheaderRef);

  const closeMessage = () => {
    setShowMessage(false);
  };

  useEffect(() => {
    chatBodyRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    dragElement();
    closeRef.current.ontouchstart = closeMessage;
  }, []);

  // 채팅창 종료시 위치 초기화
  useEffect(() => setDefault(), [showMessage]);

  const handleNewMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim().length > 0) {
      sendMessage(newMessage, nickname);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div ref={chatRef} className={`chat-room-container rounded ${showMessage ? '' : 'd-none'}`}>
      <div className="modal-content">
        <div ref={chatheaderRef} className="modal-header move-cursor p-2">
          <h5 className="modal-title">Messages</h5>
          <button ref={closeRef} type="button" className="close" onClick={closeMessage}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div ref={chatBodyRef} className="modal-body body-size">
          {
            messages.map((message, i) => (
              <div key={i} className="mt-1">
                <small className={message.ownedByCurrentUser ? 'd-flex justify-content-end' : 'd-flex'}>
                  <span className="d-inline-block text-truncate name-with font-weight-bold" title={message.nickname}>{message.nickname}</span>
                  <span>{`(${message.sendedAt})`}</span>
                </small>
                <div className={`message-item p-1 rounded text-white ${message.ownedByCurrentUser ? 'bg-primary ml-auto' : 'bg-success'}`}>
                  <span className="text-break">{message.body}</span>
                </div>
              </div>
            ))
          }
        </div>
        <div className="modal-footer p-2">
          <input
            type="text"
            value={newMessage}
            onChange={handleNewMessageChange}
            className="new-message-input-field rounded border border-dark"
            onKeyPress={handleKeyPress}
          />
          <button type="button" onClick={handleSendMessage} className="btn btn-primary shadow-none">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
