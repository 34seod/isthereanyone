import React, { useEffect, useState, createRef } from 'react';
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
import useSocket from '../../lib/useSocket';
import { RoomState, VideoSrc } from '../../types';
import Chat from '../Chat/Chat';
import Video from '../Video/Video';
import './VideoRoom.css';
import IconButton from '../IconButton/IconButton';
import FlashMessage from '../FlashMessage/FlashMessage';

type Props = {
  roomId: string
  roomState: RoomState
};

const VideoRoom = ({ roomId, roomState }: Props) => {
  const videoRef = createRef<HTMLVideoElement>();
  const [videoSrces, setVideoSrces] = useState<VideoSrc[]>([]);
  const [lock, setLock] = useState<boolean>(false);
  const [isScreenShare, setIsScreenShare] = useState<boolean>(false);
  const [showFlashMessage, setShowFlashMessage] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(roomState.isMuted);
  const [isRecording, setIsRecording] =
    useState<boolean>(roomState.isRecording);
  const {
    messages,
    sendMessage,
    start,
    handleMute,
    handleScreen,
    handleLock,
    handleScreenShare,
    stopCapture
  } = useSocket(roomId, roomState, setVideoSrces, setLock);

  useEffect(() => {
    start(videoRef);
  }, [roomId]);

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
        />
      );
    }
    return null;
  };

  return (
    <>
      {showFlashMessage ? <FlashMessage message="Current url is copied to clipboard." during={1000} unmount={setShowFlashMessage} /> : null}
      <h1>{`방 페이지-${roomId}`}</h1>
      <div>
        <IconButton
          icon={isMuted ? faMicrophoneSlash : faMicrophone}
          handleOnclick={handleMuteButton}
        />
        <IconButton
          icon={isRecording ? faVideoSlash : faVideo}
          handleOnclick={handleVideoButton}
        />
        {screenShareButton()}
        <IconButton icon={faLink} handleOnclick={handleLinkCopyButton} />
        <IconButton icon={faSignOutAlt} handleOnclick={handleHangUpButton} />
        <IconButton
          icon={lock ? faLock : faLockOpen}
          handleOnclick={handleLockButton}
        />
      </div>
      <video
        id="localVideo"
        className="reverse"
        ref={videoRef}
        autoPlay={true}
        muted={true}
        playsInline={true}
        width={320}
        height={240}
      >
        <track kind="captions" />
      </video>
      {videoSrces.map((videoSrc) => <Video key={`${videoSrc.socketId}`} videoSrc={videoSrc} />)}
      <hr />
      <Chat
        nickname={roomState.nickname}
        messages={messages}
        sendMessage={sendMessage}
      />
    </>
  );
};

export default VideoRoom;
