
import React, { useEffect, createRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import { Link, useHistory, useLocation  } from 'react-router-dom';
import FlashMessage from '../components/FlashMessage/FlashMessage';
import { urlEscape } from '../types';

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
    <div className="New-container">
      {showFlashMessage ? <FlashMessage message="The room is locked." during={3000} unmount={setShowFlashMessage} /> : null}
      <input
        ref={inputRef}
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
        onKeyPress={e => handleKeyPress(e)}
      />
      <Link to={`/${roomName}`} className="btn btn-primary">
        Enter
      </Link>
    </div>
  );
};

export default New;
