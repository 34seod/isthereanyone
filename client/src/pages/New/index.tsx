import React, { useEffect, createRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import { useHistory, useLocation  } from 'react-router-dom';
import Door from '../../components/Door';
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
  }, [history, inputRef, location.search]);

  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(urlEscape(event.target.value.trim()));
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') history.push(`/${roomName}`);
  };

  return (
    <div className="new fix">
      <Door
        showFlashMessage={showFlashMessage}
        inputRef={inputRef}
        roomName={roomName}
        setShowFlashMessage={setShowFlashMessage}
        handleKeyPress={handleKeyPress}
        handleRoomNameChange={handleRoomNameChange}
      />
    </div>
  );
};

export default New;
