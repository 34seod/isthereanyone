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
import IconButton from '../../IconButton';

type Props = {
  roomState: RoomState
  setRoomState: Dispatch<SetStateAction<RoomState>>
  handleStartButton: () => void
};

const Buttons = ({
  setRoomState, roomState, handleStartButton
}: Props) => {
  const history = useHistory();

  const handleLeaveButton = () => {
    history.push('/');
  };

  const handleMuteButton = () => {
    setRoomState((prev) => ({ ...prev, isVoiceOn: !prev.isVoiceOn }));
  };

  const handleVideoButton = () => {
    setRoomState((prev) => ({ ...prev, isScreenOn: !prev.isScreenOn }));
  };

  return (
    <div className="d-flex mt-3">
      <div className="ml-auto mr-auto">
        <IconButton
          icon={roomState.isVoiceOn ? faMicrophone : faMicrophoneSlash}
          handleOnclick={handleMuteButton}
          className={roomState.isVoiceOn ? 'bg-success text-white' : 'bg-danger text-white'}
        />
        <IconButton
          icon={roomState.isScreenOn ? faVideo : faVideoSlash}
          handleOnclick={handleVideoButton}
          className={roomState.isScreenOn ? 'bg-success text-white' : 'bg-danger text-white'}
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

export default Buttons;
