import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, createRef } from 'react';
import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
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

  useEffect(() => {
    inputRef?.current?.focus();
  });

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleStartButton();
  };

  const handleNickNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomState((prev) => ({ ...prev, nickName: event.target.value.trim() }));
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

  return (
    <>
      <h1>{`방 페이지-${roomId}`}</h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="Insert nickname"
        value={roomState.nickName}
        onChange={handleNickNameChange}
        onKeyPress={handleKeyPress}
        className="text-input-field"
      />
      <div>
        <IconButton
          icon={roomState.isMuted ? faMicrophoneSlash : faMicrophone}
          handleOnclick={handleMuteButton}
        />
        <IconButton
          icon={roomState.isRecording ? faVideoSlash : faVideo}
          handleOnclick={handleVideoButton}
        />
        <IconButton icon={faSignInAlt} handleOnclick={handleStartButton} />
      </div>
    </>
  );
};

export default GreenRoom;
