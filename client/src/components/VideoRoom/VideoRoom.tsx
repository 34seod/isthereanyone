import React, { useEffect, useState, useRef } from 'react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import useSocket from '../../lib/useSocket';
import { RoomState, VideoSrc } from '../../types';
import Chat from '../Chat/Chat';
import Video from '../Video/Video';
import './VideoRoom.css';
import FlashMessage from '../FlashMessage/FlashMessage';
import VideoRoomButtons from '../VideoRoomButtons';
import MyCam from '../MyCam/MyCam';

type Props = {
  roomId: string
  roomState: RoomState
};

const VideoRoom = ({ roomId, roomState }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(document.createElement('video'));
  const [videoSrces, setVideoSrces] = useState<VideoSrc[]>([]);
  const [lock, setLock] = useState<boolean>(false);
  const [isScreenShare, setIsScreenShare] = useState<boolean>(false);
  const [showFlashMessage, setShowFlashMessage] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(roomState.isMuted);
  const [showMessage, setShowMessage] = useState<boolean>(false);
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

  const remoteVideoes = () =>
    videoSrces.map((videoSrc) =>
      <div className="col video-padding" key={`${videoSrc.socketId}`}>
        <Video videoSrc={videoSrc} />
      </div>
    );

  return (
    <div className="video-room fix h-100 w-100">
      {showFlashMessage ? <FlashMessage message="URL has been copied. Share with others." during={3000} unmount={setShowFlashMessage} /> : null}
      <MyCam videoRef={videoRef} />
      {
        videoSrces.length > 0 ?
          <div className="container h-100 d-flex">
            <div className={`m-auto row row-cols-${videoSrces.length > 2 ? Math.ceil(videoSrces.length / 2) : videoSrces.length}`}>
              {remoteVideoes()}
            </div>
          </div> :
          <div className="d-flex w-100 h-100">
            <h1 className="m-auto text-white">Nobody in here</h1>
          </div>
      }
      <VideoRoomButtons
        setIsMuted={setIsMuted}
        handleMute={handleMute}
        setIsRecording={setIsRecording}
        handleScreen={handleScreen}
        setLock={setLock}
        handleLock={handleLock}
        isScreenShare={isScreenShare}
        setIsScreenShare={setIsScreenShare}
        stopCapture={stopCapture}
        handleScreenShare={handleScreenShare}
        setShowFlashMessage={setShowFlashMessage}
        setShowMessage={setShowMessage}
        isMuted={isMuted}
        isRecording={isRecording}
        lock={lock}
      />
      <Chat
        showMessage={showMessage}
        setShowMessage={setShowMessage}
        nickname={roomState.nickname}
        messages={messages}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default VideoRoom;
