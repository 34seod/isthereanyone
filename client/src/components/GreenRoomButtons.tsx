import React, { Dispatch, SetStateAction } from 'react';
import { useHistory  } from 'react-router-dom';
import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
  faSignOutAlt,
  faSignInAlt
} from '@fortawesome/free-solid-svg-icons';
import { RoomState } from '../types';
import IconButton from './IconButton/IconButton';

type Props = {
  roomState: RoomState
  setRoomState: Dispatch<SetStateAction<RoomState>>
  handleStartButton: () => void
};

const GreenRoomButtons = ({
  setRoomState, roomState, handleStartButton
}: Props) => {
  const history = useHistory();

  const handleLeaveButton = () => {
    history.push('/');
  };

  const handleMuteButton = () => {
    setRoomState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const handleVideoButton = () => {
    setRoomState((prev) => ({ ...prev, isRecording: !prev.isRecording }));
  };

  return (
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
  );
};

export default GreenRoomButtons;
