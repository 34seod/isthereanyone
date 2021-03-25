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

type Props = {
  roomId: string
  roomState: RoomState
};

const VideoRoom = ({ roomId, roomState }: Props) => {
  const videoRef = createRef<HTMLVideoElement>();
  const [videoSrces, setVideoSrces] = useState<VideoSrc[]>([]);
  const [lock, setLock] = useState<boolean>(false);
  const [isScreenShare, setIsScreenShare] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(roomState.isMuted);
  const [isRecording, setIsRecording] =
    useState<boolean>(roomState.isRecording);
  const {
    messages,
    sendMessage,
    getStream,
    handleMute,
    handleScreen,
    handleLock,
    handleScreenShare,
    stopCapture
  } = useSocket(roomId, roomState, setVideoSrces, setLock);

  useEffect(() => {
    getStream(videoRef);

    // if ((navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices)) {
    //   startButton.disabled = false;
    // } else {
    //   console.log('getDisplayMedia is not supported');
    // }
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

  return (
    <>
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
        <IconButton
          icon={faDesktop}
          handleOnclick={handleScreenShareButton}
        />
        <IconButton icon={faSignOutAlt} handleOnclick={handleHangUpButton} />
        <IconButton
          icon={lock ? faLock : faLockOpen}
          handleOnclick={handleLockButton}
        />
      </div>
      <video
        id="localVideo"
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
      <Chat roomId={roomId} messages={messages} sendMessage={sendMessage} />
    </>
  );
};

export default VideoRoom;
