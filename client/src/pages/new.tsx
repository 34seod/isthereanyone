
import React, { useEffect, createRef } from 'react';
import { Link, useHistory  } from 'react-router-dom';
import { urlEscape } from '../types';

const New = () => {
  const [roomName, setRoomName] = React.useState('');
  const inputRef = createRef<HTMLInputElement>();
  const history = useHistory();

  useEffect(() => {
    inputRef?.current?.focus();
  });

  const handleRoomNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(urlEscape(event.target.value.trim()));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') history.push(`/${roomName}`);
  };

  return (
    <div className="New-container">
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
