import React, { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';
import useSocket from '../../hooks/useSocket';
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
  setRoomState: Dispatch<SetStateAction<RoomState>>
};

const VideoRoom = ({ roomId, roomState, setRoomState }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(document.createElement('video'));
  const [videoSrces, setVideoSrces] = useState<VideoSrc[]>([]);
  const [lock, setLock] = useState<boolean>(false);
  const [isScreenShare, setIsScreenShare] = useState<boolean>(false);
  const [showFlashMessage, setShowFlashMessage] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
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
    document.body.classList.add('video-room');
  }, []);

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
    <div className="fix h-100 w-100">
      {showFlashMessage ? <FlashMessage message="URL has been copied. Share with others." during={3000} unmount={setShowFlashMessage} /> : null}
      <MyCam
        videoRef={videoRef}
        nickname={roomState.nickname}
        isScreenShare={isScreenShare}
        roomId={roomId}
        setShowFlashMessage={setShowFlashMessage}
      />
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
        handleMute={handleMute}
        handleScreen={handleScreen}
        setLock={setLock}
        handleLock={handleLock}
        isScreenShare={isScreenShare}
        setIsScreenShare={setIsScreenShare}
        stopCapture={stopCapture}
        handleScreenShare={handleScreenShare}
        setShowMessage={setShowMessage}
        setRoomState={setRoomState}
        roomState={roomState}
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
