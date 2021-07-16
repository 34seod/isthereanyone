import React, { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';
import useSocket from '../../hooks/useSocket';
import Chat from '../Chat';
import FlashMessage from '../FlashMessage';
import Buttons from './Buttons';
import MyCam from '../MyCam';
import VideoRow from '../VideoRow';
import './index.css';

type Props = {
  roomId: string
  roomState: RoomState
  setRoomState: Dispatch<SetStateAction<RoomState>>
};

const VideoRoom = ({ roomId, roomState, setRoomState }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(document.createElement('video'));
  const [videoSrces, setVideoSrces] = useState<VideoSrc[]>([]);
  const [lock, setLock] = useState<boolean>(false);
  const [isScreenShare, setIsScreenShare] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [isNewMessage, setIsNewMessage] = useState<boolean>(false);
  const {
    messages,
    sendMessage,
    start,
    handleMute,
    handleScreen,
    handleLock,
    handleScreenShare,
    stopCapture
  } = useSocket(
    roomId,
    roomState,
    setVideoSrces,
    setLock,
    setIsScreenShare
  );

  useEffect(() => {
    document.body.classList.add('video-room');
    return () => document.body.classList.remove('video-room');
  }, []);

  useEffect(() => {
    start(videoRef);
  }, [roomId]);

  return (
    <div className="fix">
      <FlashMessage message="URL has been copied. Share with others." />
      <MyCam
        videoRef={videoRef}
        nickname={roomState.nickname}
        isScreenShare={isScreenShare}
        roomId={roomId}
      />
      <VideoRow videoSrces={videoSrces} />
      <Buttons
        handleMute={handleMute}
        handleScreen={handleScreen}
        setLock={setLock}
        handleLock={handleLock}
        isScreenShare={isScreenShare}
        stopCapture={stopCapture}
        handleScreenShare={handleScreenShare}
        setShowMessage={setShowMessage}
        setRoomState={setRoomState}
        roomState={roomState}
        lock={lock}
        isNewMessage={isNewMessage}
        setIsNewMessage={setIsNewMessage}
      />
      <Chat
        showMessage={showMessage}
        setShowMessage={setShowMessage}
        nickname={roomState.nickname}
        messages={messages}
        sendMessage={sendMessage}
        setIsNewMessage={setIsNewMessage}
      />
    </div>
  );
};

export default VideoRoom;
