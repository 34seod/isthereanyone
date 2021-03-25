
import React, { useEffect, createRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import { Link, useHistory, useLocation  } from 'react-router-dom';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlashMessage from '../../components/FlashMessage/FlashMessage';
import { urlEscape } from '../../types';
import './New.css';

const New = () => {
  const [roomName, setRoomName] = useState('');
  const [showFlashMessage, setShowFlashMessage] = useState<boolean>(false);
  const inputRef = createRef<HTMLInputElement>();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    inputRef?.current?.focus();
    if (/locked/.test(location.search)) {
      setShowFlashMessage(true);
      history.push('/');
    }
  });

  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(urlEscape(event.target.value.trim()));
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') history.push(`/${roomName}`);
  };

  return (
    <>
      <FontAwesomeIcon icon={faDoorClosed} className="background-icon" />
      <div className="d-flex h-100">
        {showFlashMessage ? <FlashMessage message="The room is locked." during={3000} unmount={setShowFlashMessage} /> : null}
        <div className="m-auto">
          <p className="title text-center">Is there anyone ?</p>
          <div className="text-center">
            <input
              ref={inputRef}
              type="text"
              placeholder="Room"
              value={roomName}
              onChange={handleRoomNameChange}
              className="text-input-field border border-dark rounded"
              onKeyPress={e => handleKeyPress(e)}
            />
          </div>

          <div className="text-center">
            <Link to={`/${roomName}`} className="mt-3 btn enter-btn-size btn-primary">
              Enter
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default New;