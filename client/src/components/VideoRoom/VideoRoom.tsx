import React, { useEffect, useState, createRef } from 'react';
import useSocket from '../../lib/useSocket';
import { RoomState, VideoSrc } from '../../types';
import Chat from '../Chat/Chat';
import Video from '../Video/Video';
import './VideoRoom.css';
import FlashMessage from '../FlashMessage/FlashMessage';
import VideoRoomButtons from '../VideoRoomButtons';

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

  const remoteVideoes = () =>
    videoSrces.map((videoSrc) =>
      <div className="col video-padding" key={`${videoSrc.socketId}`}>
        <Video videoSrc={videoSrc} />
      </div>
    );

  return (
    <div className="video-room fix h-100 w-100">
      {showFlashMessage ? <FlashMessage message="URL has been copied. Share with others." during={3000} unmount={setShowFlashMessage} /> : null}
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
      {
        videoSrces.length > 0 ?
          <div className="container">
            <div className={`row row-cols-${videoSrces.length > 2 ? Math.ceil(videoSrces.length / 2) : videoSrces.length}`}>
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
        isMuted={isMuted}
        isRecording={isRecording}
        lock={lock}
      />
      {/* <Chat
        nickname={roomState.nickname}
        messages={messages}
        sendMessage={sendMessage}
      /> */}
    </div>
  );
};

export default VideoRoom;
