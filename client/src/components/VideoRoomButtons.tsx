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
  faLockOpen
} from '@fortawesome/free-solid-svg-icons';
import IconButton from './IconButton/IconButton';

type Props = {
  setIsMuted: Dispatch<SetStateAction<boolean>>
  handleMute: () => void
  setIsRecording: Dispatch<SetStateAction<boolean>>
  handleScreen: () => void
  setLock: Dispatch<SetStateAction<boolean>>
  handleLock: () => void
  isScreenShare: boolean
  setIsScreenShare: Dispatch<SetStateAction<boolean>>
  stopCapture: () => void
  handleScreenShare: () => void
  setShowFlashMessage: Dispatch<SetStateAction<boolean>>
  isMuted: boolean
  isRecording: boolean
  lock: boolean
};

const VideoRoomButtons = ({
  setIsMuted, handleMute, setIsRecording, handleScreen, setLock, handleLock,
  isScreenShare, setIsScreenShare, stopCapture, handleScreenShare,
  setShowFlashMessage, isMuted, isRecording, lock
}: Props) => {

  const handleMuteButton = () => {
    setIsMuted((prev: boolean) => !prev);
    handleMute();
  };

  const handleVideoButton = () => {
    setIsRecording((prev: boolean) => !prev);
    handleScreen();
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

  const handleLinkCopyButton = () => {
    const el = document.createElement('textarea');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setShowFlashMessage(true);
  };

  const screenShareButton = () => {
    if (navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices) {
      return (
        <IconButton
          icon={faDesktop}
          handleOnclick={handleScreenShareButton}
          className={isScreenShare ? 'bg-danger text-white' : 'bg-success text-white'}
        />
      );
    }
    return null;
  };

  return (
    <div className="fixed-bottom mb-2 d-flex">
      <div className="ml-auto mr-auto">
        <IconButton
          icon={isMuted ? faMicrophoneSlash : faMicrophone}
          handleOnclick={handleMuteButton}
          className={isMuted ? 'bg-danger text-white' : 'bg-success text-white'}
        />
        <IconButton
          icon={isRecording ? faVideoSlash : faVideo}
          handleOnclick={handleVideoButton}
          className={isRecording ? 'bg-danger text-white' : 'bg-success text-white'}
        />
        {screenShareButton()}
        <IconButton
          icon={faLink}
          handleOnclick={handleLinkCopyButton}
          className="bg-info text-white"
        />
        <IconButton
          icon={lock ? faLock : faLockOpen}
          handleOnclick={handleLockButton}
          className={lock ? 'bg-danger text-white' : 'bg-warning'}
        />
        <IconButton
          icon={faSignOutAlt}
          handleOnclick={handleHangUpButton}
          className="bg-danger text-white"
        />
      </div>
    </div>
  );
};

export default VideoRoomButtons;