/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { KeyboardEvent, useState, ChangeEvent, Dispatch, SetStateAction, useRef, useEffect } from 'react';
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
  const [newMessage, setNewMessage] = useState(''); // Message to be sent
  const chatRef = useRef(document.createElement('div'));
  const chatheaderRef = useRef(document.createElement('div'));
  const chatBodyRef = useRef(document.createElement('div'));
  const pos1 = useRef(0);
  const pos2 = useRef(0);
  const pos3 = useRef(0);
  const pos4 = useRef(0);

  useEffect(() => {
    chatBodyRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    dragElement();
  }, []);

  const dragElement = () => {
    chatheaderRef.current.onmousedown = dragMouseDown;
  };

  const dragMouseDown = (e: MouseEvent) => {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3.current = e.clientX;
    pos4.current = e.clientY;
    document.onmouseup = closeDragElement;
    // call a const whenever the cursor moves:
    document.onmousemove = elementDrag;
  };

  const elementDrag = (e: MouseEvent) => {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1.current = pos3.current - e.clientX;
    pos2.current = pos4.current - e.clientY;
    pos3.current = e.clientX;
    pos4.current = e.clientY;
    // set the element's new position:
    chatRef.current.style.top = `${chatRef.current.offsetTop - pos2.current}px`;
    chatRef.current.style.left = `${chatRef.current.offsetLeft - pos1.current}px`;
  };

  const closeDragElement = () => {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  };

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
          <button type="button" className="close" onClick={() => setShowMessage(false)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div ref={chatBodyRef} className="modal-body body-size">
          {
            messages.map((message, i) => (
              <div key={i} className="mt-1">
                <small className={message.ownedByCurrentUser ? 'd-flex justify-content-end' : 'd-flex'}>
                  <span className="d-inline-block text-truncate name-with font-weight-bold">{message.nickname}</span>
                  <span>{`(${message.sendedAt})`}</span>
                </small>
                <div className={`message-item p-1 rounded text-white ${message.ownedByCurrentUser ? 'bg-primary ml-auto' : 'bg-success'}`}>
                  <span>{message.body}</span>
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
