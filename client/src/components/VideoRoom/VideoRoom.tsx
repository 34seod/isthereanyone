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
  } = useSocket(roomId, roomState, setVideoSrces, setLock, setIsScreenShare);

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
          className={isScreenShare ? 'bg-danger text-white' : 'bg-success text-white'}
          borderClass=""
        />
      );
    }
    return null;
  };

  const remoteVideoes = () =>
    videoSrces.map((videoSrc) =>
      <div className="col video-padding" key={`${videoSrc.socketId}`}>
        <Video videoSrc={videoSrc} />
      </div>
    );

  return (
    <div className="video-room fix h-100 w-100">
      {showFlashMessage ? <FlashMessage message="Current url is copied to clipboard." during={2000} unmount={setShowFlashMessage} /> : null}
      <div className="my-cam rounded p-1 bg-danger">
        <video
          id="localVideo"
          className="reverse"
          ref={videoRef}
          autoPlay={true}
          muted={true}
          playsInline={true}
          width="100%"
          height="100%"
        >
          <track kind="captions" />
        </video>
      </div>
      <div className="container">
        <div className={`row row-cols-${videoSrces.length > 2 ? Math.ceil(videoSrces.length / 2) : videoSrces.length}`}>
          {remoteVideoes()}
        </div>
      </div>
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
      {/* <Chat
        nickname={roomState.nickname}
        messages={messages}
        sendMessage={sendMessage}
      /> */}
    </div>
  );
};

export default VideoRoom;
