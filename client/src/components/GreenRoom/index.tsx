import React, { ChangeEvent, useEffect, createRef } from 'react';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { changeNickname, changeIsStarted } from '../../store/actionCreators';
import Buttons from './Buttons';
import './index.css';

const GreenRoom: React.FC = () => {
  const inputRef = createRef<HTMLInputElement>();
  const dispatch = useDispatch();
  const nickname = useSelector((state: State) => state.nickname);

  useEffect(() => {
    inputRef?.current?.focus();
    document.body.classList.remove('video-room');
  }, [inputRef]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleStartButton();
  };

  const handleStartButton = () => {
    dispatch(changeNickname(`${nickname}#${Math.floor(Math.random() * (99999 - 10000) + 10000)}`));
    dispatch(changeIsStarted(true));
  };

  const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeNickname(event.target.value.trim()));
  };

  return (
    <div className="green-room fix">
      <FontAwesomeIcon icon={faDoorOpen} className="background-icon" />
      <div className="d-flex h-100 w-100">
        <div className="m-auto wrapper rounded">
          <p className="title text-center mb-0">Who's there?</p>
          <div className="d-flex mt-3">
            <input
              ref={inputRef}
              type="text"
              placeholder="name"
              value={nickname}
              onChange={handleNicknameChange}
              onKeyPress={handleKeyPress}
              className="text-input-field ml-auto mr-auto border border-dark rounded"
            />
          </div>
          <Buttons handleStartButton={handleStartButton} />
        </div>
      </div>
    </div>
  );
};

export default GreenRoom;
