import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { RoomState } from '../../types';
import './GreenRoom.css';

type Props = {
  roomId: string
  roomState: RoomState
  setRoomState: Dispatch<SetStateAction<RoomState>>
};

const GreenRoom = ({ roomId, roomState, setRoomState }: Props) => {
  const handleNickNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomState((prev) => ({ ...prev, nickName: event.target.value.trim() }));
  };

  const handleMuteButton = () => {
    console.log('mute', roomState.isMuted);
    setRoomState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const handleVideoButton = () => {
    console.log('video', roomState.isRecording);
    setRoomState((prev) => ({ ...prev, isRecording: !prev.isRecording }));
  };

  const handleStartButton = () => {
    console.log('start', roomState.isStarted);
    setRoomState((prev) => ({ ...prev, isStarted: true }));
  };

  return (
    <>
      <h1>{`방 페이지-${roomId}`}</h1>
      <input
        type="text"
        placeholder="insert nickname"
        value={roomState.nickName}
        onChange={handleNickNameChange}
        className="text-input-field"
      />
      <button className="btn btn-primary mr-1" type="button" onClick={handleMuteButton}>Mute</button>
      <button className="btn btn-primary mr-1" type="button" onClick={handleVideoButton}>Video</button>
      <button className="btn btn-primary mr-1" type="button" onClick={handleStartButton}>Start</button>
    </>
  );
};

export default GreenRoom;
