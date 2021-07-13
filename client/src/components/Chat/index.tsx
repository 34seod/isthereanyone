/* eslint-disable react/no-array-index-key */

import React, { KeyboardEvent, useState, ChangeEvent, Dispatch, SetStateAction, useRef, useEffect } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDraggable from '../../hooks/useDraggable';
import { Message } from '../../types';
import './index.css';

type Props = {
  showMessage: boolean
  nickname: string,
  messages: Message[],
  sendMessage: (newMessage: string, nickname: string) => void,
  setShowMessage: Dispatch<SetStateAction<boolean>>,
  setIsNewMessage: Dispatch<SetStateAction<boolean>>
};

const Chat = ({
  showMessage,
  nickname,
  messages,
  sendMessage,
  setShowMessage,
  setIsNewMessage
}: Props) => {
  const [newMessage, setNewMessage] = useState('');
  const chatRef = useRef(document.createElement('div'));
  const chatheaderRef = useRef(document.createElement('div'));
  const { dragElement, setDefault } = useDraggable(chatRef, chatheaderRef);

  const closeMessage = () => {
    setIsNewMessage(false);
    setShowMessage(false);
  };

  useEffect(() => {
    const element = document.getElementById('chat-body');
    if (element) element.scrollTop = element.scrollHeight;
    if (messages.length > 0 && !showMessage) setIsNewMessage(true);
  }, [messages, setIsNewMessage]);

  useEffect(() => {
    dragElement();
  }, [dragElement]);

  // 채팅창 종료시 위치 초기화
  useEffect(() => setDefault(), [showMessage, setDefault]);

  const handleNewMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim().length > 0) {
      sendMessage(newMessage, nickname);
      setIsNewMessage(false);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const parseBody = (body: string) => {
    try {
      const notUrlInBody = body.slice(0, body.search('http'));
      const urlInBody = body.slice(body.search('http'));
      const url = new URL(urlInBody);
      return (<>{notUrlInBody}<a href={url.href} rel="noreferrer" target="_blank">{urlInBody}</a></>);
    } catch {
      return body;
    }
  };

  return (
    <div ref={chatRef} className={`chat-room-container rounded ${showMessage ? '' : 'd-none'}`}>
      <div className="modal-content">
        <div ref={chatheaderRef} className="modal-header move-cursor p-2">
          <h5 className="modal-title">Messages</h5>
          <button type="button" className="close" onClick={closeMessage}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div id="chat-body" className="modal-body body-size">
          {
            messages.map((message, i) => (
              <div key={i} className="mt-1">
                <small className={message.ownedByCurrentUser ? 'd-flex justify-content-end' : 'd-flex'}>
                  <span className="d-inline-block text-truncate name-with font-weight-bold" title={message.nickname}>{message.nickname}</span>
                  <span>{`(${message.sendedAt})`}</span>
                </small>
                <div className={`message-item p-1 rounded ${message.ownedByCurrentUser ? 'bg-my-msg ml-auto' : 'bg-other-msg'}`}>
                  <span className="text-break">{parseBody(message.body)}</span>
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
