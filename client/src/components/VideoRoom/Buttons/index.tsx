import React, { Dispatch, SetStateAction } from 'react';
import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
  faDesktop,
  faSignOutAlt,
  faLock,
  faLockOpen,
  faComments
} from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../IconButton';
import { RoomState } from '../../../types';

type Props = {
  lock: boolean
  roomState: RoomState
  isNewMessage: boolean,
  isScreenShare: boolean
  handleLock: () => void
  stopCapture: () => void
  handleScreenShare: () => void
  handleMute: (isVoiceOn: boolean) => void
  handleScreen: (isScreenOn: boolean) => void
  setLock: Dispatch<SetStateAction<boolean>>
  setShowMessage: Dispatch<SetStateAction<boolean>>
  setRoomState: Dispatch<SetStateAction<RoomState>>
  setIsNewMessage: Dispatch<SetStateAction<boolean>>
};

const Buttons = ({
  handleMute, handleScreen, setLock, handleLock, roomState,
  isScreenShare, stopCapture, handleScreenShare,
  setShowMessage, setRoomState, lock, isNewMessage, setIsNewMessage
}: Props) => {

  const handleMuteButton = () => {
    setRoomState((prev: RoomState) =>
      ({ ...prev, isVoiceOn: !prev.isVoiceOn }));
    handleMute(!roomState.isVoiceOn);
  };

  const handleVideoButton = () => {
    setRoomState((prev: RoomState) =>
      ({ ...prev, isScreenOn: !prev.isScreenOn }));
    handleScreen(!roomState.isScreenOn);
  };

  const handleHangUpButton = () => {
    window.location.href = '/';
  };

  const handleLockButton = () => {
    setLock((prev: boolean) => !prev);
    handleLock();
  };

  const handleScreenShareButton = () => {
    isScreenShare ? stopCapture() : handleScreenShare();
  };

  const screenShareButton = () => {
    if (navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices) {
      return (
        <IconButton
          icon={faDesktop}
          handleOnclick={handleScreenShareButton}
          className={isScreenShare ? 'bg-danger text-white' : 'bg-primary text-white'}
        />
      );
    }
    return null;
  };

  const handleOpenMessage = () => {
    setShowMessage((prev) => !prev);
    setIsNewMessage(false);
  };

  return (
    <div className="fixed-bottom mb-3 d-flex">
      <div className="ml-auto mr-auto">
        <IconButton
          icon={lock ? faLock : faLockOpen}
          handleOnclick={handleLockButton}
          className={lock ? 'bg-danger text-white' : 'bg-warning'}
        />
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
        {screenShareButton()}
        <IconButton
          icon={faComments}
          handleOnclick={handleOpenMessage}
          className="bg-warning text-white"
          notification={isNewMessage}
        />
        <IconButton
          icon={faSignOutAlt}
          handleOnclick={handleHangUpButton}
          className="bg-danger text-white"
          mr={0}
        />
      </div>
    </div>
  );
};

export default Buttons;
