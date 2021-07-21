import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useSocket from '../../hooks/useSocket';
import Chat from '../Chat';
import FlashMessage from '../FlashMessage';
import Buttons from './Buttons';
import MyCam from '../MyCam';
import VideoRow from '../VideoRow';
import './index.css';

const VideoRoom: React.FC = () => {
  const { roomId } = useParams< { roomId: string } >();
  const videoRef = useRef<HTMLVideoElement>(document.createElement('video'));
  const videoSrces = useSelector((state: State) => state.videoSrces);

  const {
    sendMessage,
    start,
    handleMute,
    handleScreen,
    handleLock,
    handleScreenShare,
    stopCapture
  } = useSocket(roomId);

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
        roomId={roomId}
      />
      <VideoRow videoSrces={videoSrces} />
      <Buttons
        handleMute={handleMute}
        handleScreen={handleScreen}
        handleLock={handleLock}
        stopCapture={stopCapture}
        handleScreenShare={handleScreenShare}
      />
      <Chat sendMessage={sendMessage} />
    </div>
  );
};

export default VideoRoom;
