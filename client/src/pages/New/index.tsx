import React, { useEffect, createRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import { Link, useHistory, useLocation  } from 'react-router-dom';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlashMessage from '../../components/FlashMessage';
import { urlEscape } from '../../types';
import './index.css';

const New = () => {
  const [roomName, setRoomName] = useState('');
  const [showFlashMessage, setShowFlashMessage] = useState<boolean>(false);
  const inputRef = createRef<HTMLInputElement>();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    inputRef?.current?.focus();
    document.body.classList.remove('video-room');
    if (/locked/.test(location.search)) {
      setShowFlashMessage(true);
      history.push('/');
    }
  }, []);

  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(urlEscape(event.target.value.trim()));
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') history.push(`/${roomName}`);
  };

  return (
    <div className="new fix h-100 w-100">
      <FontAwesomeIcon icon={faDoorClosed} className="background-icon" />
      {showFlashMessage ? <FlashMessage message="The room is locked." during={3000} unmount={setShowFlashMessage} /> : null}
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
            <Link to={`/${roomName}`} className="mt-3 btn enter-btn-size btn-primary">
              Knock! Knock!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
