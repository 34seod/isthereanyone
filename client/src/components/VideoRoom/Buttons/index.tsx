import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
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
import { changeIsCameraOn, changeIsMikeOn, changeIsNewMessage, changeLock, changeShowMessage } from '../../../store/actionCreators';
import showMessage from '../../../store/reducers/showMessage';

type Props = {
  handleLock: () => void
  handleScreenShare: () => void
  handleMute: (isMikeOn: boolean) => void
  handleScreen: (isCameraOn: boolean) => void
  stopCapture: () => void
};

const Buttons: React.FC<Props> = ({
  handleLock, handleScreenShare, handleMute, handleScreen, stopCapture
}: Props) => {
  const dispatch = useDispatch();
  const {
    isCameraOn, isMikeOn, isScreenShare, lock, isNewMessage
  } = useSelector((state: State) => state, shallowEqual);

  const handleMuteButton = () => {
    dispatch(changeIsMikeOn(!isMikeOn));
    handleMute(!isMikeOn);
  };

  const handleVideoButton = () => {
    dispatch(changeIsCameraOn(!isCameraOn));
    handleScreen(!isCameraOn);
  };

  const handleHangUpButton = () => {
    window.location.href = '/';
  };

  const handleLockButton = () => {
    dispatch(changeLock(!lock));
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
    dispatch(changeIsNewMessage(false));
    dispatch(changeShowMessage(!showMessage));
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
          icon={isMikeOn ? faMicrophone : faMicrophoneSlash}
          handleOnclick={handleMuteButton}
          className={isMikeOn ? 'bg-success text-white' : 'bg-danger text-white'}
        />
        <IconButton
          icon={isCameraOn ? faVideo : faVideoSlash}
          handleOnclick={handleVideoButton}
          className={isCameraOn ? 'bg-success text-white' : 'bg-danger text-white'}
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
