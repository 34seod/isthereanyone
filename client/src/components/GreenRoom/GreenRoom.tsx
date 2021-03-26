import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, createRef } from 'react';
import { useHistory  } from 'react-router-dom';
import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
  faSignInAlt,
  faSignOutAlt,
  faDoorOpen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RoomState } from '../../types';
import './GreenRoom.css';
import IconButton from '../IconButton/IconButton';

type Props = {
  roomId: string
  roomState: RoomState
  setRoomState: Dispatch<SetStateAction<RoomState>>
};

const GreenRoom = ({ roomId, roomState, setRoomState }: Props) => {
  const inputRef = createRef<HTMLInputElement>();
  const history = useHistory();

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleStartButton();
  };

  const handlenicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomState((prev) => ({ ...prev, nickname: event.target.value.trim() }));
  };

  const handleMuteButton = () => {
    setRoomState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const handleVideoButton = () => {
    setRoomState((prev) => ({ ...prev, isRecording: !prev.isRecording }));
  };

  const handleStartButton = () => {
    setRoomState((prev) => ({ ...prev, isStarted: true }));
  };
  const handleLeaveButton = () => {
    history.push('/');
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
          <div className="d-flex mt-3">
            <div className="ml-auto mr-auto">
              <IconButton
                icon={roomState.isMuted ? faMicrophoneSlash : faMicrophone}
                handleOnclick={handleMuteButton}
                className={roomState.isMuted ? 'bg-danger text-white' : 'bg-success text-white'}
              />
              <IconButton
                icon={roomState.isRecording ? faVideoSlash : faVideo}
                handleOnclick={handleVideoButton}
                className={roomState.isRecording ? 'bg-danger text-white' : 'bg-success text-white'}
              />
              <IconButton
                icon={faSignInAlt}
                handleOnclick={handleStartButton}
                className="bg-primary text-white"
              />
              <IconButton
                icon={faSignOutAlt}
                handleOnclick={handleLeaveButton}
                className="bg-danger text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenRoom;
