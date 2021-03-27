import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, createRef } from 'react';
import {
  faDoorOpen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RoomState } from '../../types';
import './GreenRoom.css';
import GreenRoomButtons from '../GreenRoomButtons';

type Props = {
  roomId: string
  roomState: RoomState
  setRoomState: Dispatch<SetStateAction<RoomState>>
};

const GreenRoom = ({ roomId, roomState, setRoomState }: Props) => {
  const inputRef = createRef<HTMLInputElement>();

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleStartButton();
  };

  const handlenicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomState((prev) => ({ ...prev, nickname: event.target.value.trim() }));
  };

  const handleStartButton = () => {
    setRoomState((prev) => {
      const newNickname = `${prev.nickname}#${Math.floor(Math.random() * (99999 - 10000) + 10000)}`;
      return { ...prev, isStarted: true, nickname: newNickname };
    });
  };

  return (
    <div className="green-room fix h-100 w-100">
      <FontAwesomeIcon icon={faDoorOpen} className="background-icon" />
      <div className="d-flex h-100 w-100">
        <div className="m-auto">
          <p className="title text-center mb-0">Who's there?</p>
          <div className="d-flex mt-3">
            <input
              ref={inputRef}
              type="text"
              placeholder="name"
              value={roomState.nickname}
              onChange={handlenicknameChange}
              onKeyPress={handleKeyPress}
              className="text-input-field ml-auto mr-auto border border-dark rounded"
            />
          </div>
          <GreenRoomButtons
            roomState={roomState}
            setRoomState={setRoomState}
            handleStartButton={handleStartButton}
          />
        </div>
      </div>
    </div>
  );
};

export default GreenRoom;
