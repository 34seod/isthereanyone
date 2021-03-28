import React, { Dispatch, SetStateAction } from 'react';
import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
  faDesktop,
  faLink,
  faSignOutAlt,
  faLock,
  faLockOpen,
  faComments
} from '@fortawesome/free-solid-svg-icons';
import IconButton from './IconButton/IconButton';
import { RoomState } from '../types';

type Props = {
  handleMute: (isVoiceOn: boolean) => void
  handleScreen: (isScreenOn: boolean) => void
  setLock: Dispatch<SetStateAction<boolean>>
  handleLock: () => void
  isScreenShare: boolean
  setIsScreenShare: Dispatch<SetStateAction<boolean>>
  stopCapture: () => void
  handleScreenShare: () => void
  setShowFlashMessage: Dispatch<SetStateAction<boolean>>
  setShowMessage: Dispatch<SetStateAction<boolean>>
  setRoomState: Dispatch<SetStateAction<RoomState>>
  roomState: RoomState
  lock: boolean
};

const VideoRoomButtons = ({
  handleMute, handleScreen, setLock, handleLock, roomState,
  isScreenShare, setIsScreenShare, stopCapture, handleScreenShare,
  setShowFlashMessage, setShowMessage, setRoomState, lock
}: Props) => {

  const handleMuteButton = () => {
    setRoomState((prev: RoomState) => {
      handleMute(!prev.isVoiceOn);
      return { ...prev, isVoiceOn: !prev.isVoiceOn };
    });
  };

  const handleVideoButton = () => {
    setRoomState((prev: RoomState) => {
      handleScreen(!prev.isScreenOn);
      return { ...prev, isScreenOn: !prev.isScreenOn };
    });
  };

  const handleHangUpButton = () => {
    window.location.href = '/';
  };

  const handleLockButton = () => {
    setLock((prev: boolean) => !prev);
    handleLock();
  };

  const handleScreenShareButton = () => {
    if (isScreenShare) {
      setIsScreenShare(false);
      stopCapture();
    } else {
      setIsScreenShare(true);
      handleScreenShare();
    }
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
  };

  return (
    <>
      <div className="fixed-bottom mb-2 d-flex">
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
          />
          <IconButton
            icon={faSignOutAlt}
            handleOnclick={handleHangUpButton}
            className="bg-danger text-white"
            mr={0}
          />
        </div>
      </div>
    </>
  );
};

export default VideoRoomButtons;
