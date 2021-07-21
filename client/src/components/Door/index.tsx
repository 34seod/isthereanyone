import React, { useState, useEffect, createRef, KeyboardEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import FlashMessage from '../FlashMessage';
import { urlEscape } from '../../sharedFunctions';
import { showFlashMessage } from '../../store/actionCreators';
import './index.css';

const Door: React.FC = () => {
  const [roomName, setRoomName] = useState('');
  const inputRef = createRef<HTMLInputElement>();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef]);

  useEffect(() => {
    document.body.classList.remove('video-room');
    if (/locked/.test(location.search)) {
      dispatch(showFlashMessage(true));
      history.push('/');
    }
  }, [history, location.search, dispatch]);

  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(urlEscape(event.target.value.trim()));
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') history.push(`/${roomName}`);
  };

  return (
    <div className="fix">
      <FontAwesomeIcon icon={faDoorClosed} className="background-icon" />
      <FlashMessage message="The room is locked." />
      <div className="d-flex h-100 w-100">
        <div className="m-auto title-wrapper text-center rounded">
          <p className="title text-center mb-0">Is there anyone</p>
          <div className="group_title">
            <span className="title">in</span>
            <span className="title_tf">
              <input
                ref={inputRef}
                type="text"
                placeholder="Room"
                value={roomName}
                onChange={handleRoomNameChange}
                className="tf text-input-field border border-dark rounded"
                onKeyPress={handleKeyPress}
              />
            </span>
            <span className="title">?</span>
          </div>
          <div className="text-center">
            <button type="button" id="knock-btn" onClick={() => history.push(`/${roomName}`)} className="mt-3 btn enter-btn-size btn-primary">
              Knock! Knock!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Door;
