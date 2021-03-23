import React, { useEffect, Dispatch, SetStateAction, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSocket from '../../lib/useSocket';
import { RoomState, VideoSrc } from '../../types';
import Chat from '../Chat/Chat';
import Video from '../Video/Video';
import './VideoRoom.css';

type Props = {
  roomId: string
  roomState: RoomState
};

const VideoRoom = ({ roomId, roomState }: Props) => {
  const videoRef = React.createRef<HTMLVideoElement>();
  const history = useHistory();
  const [videoSrces, setVideoSrces] = useState<VideoSrc[]>([]);
  const [lock, setLock] = useState<boolean>(false);
  const {
    messages,
    sendMessage,
    getStream,
    hangup,
    handleMute,
    handleScreen,
    handleLock
  } = useSocket(roomId, roomState, setVideoSrces, setLock);

  useEffect(() => {
    getStream(videoRef);
  }, []);

  const handleMuteButton = () => {
    handleMute();
  };

  const handleVideoButton = () => {
    handleScreen();
  };

  const handleHangUpButton = () => {
    hangup();
    history.push('/');
  };

  const handleLockButton = () => {
    handleLock();
  };

  return (
    <>
      <h1>{`방 페이지-${roomId}`}</h1>
      <video
        id="localVideo"
        ref={videoRef}
        autoPlay={true}
        muted={true}
        playsInline={true}
      >
        <track kind="captions" />
      </video>
      {videoSrces.map((videoSrc) => <Video key={`${videoSrc.socketId}`} videoSrc={videoSrc} />)}
      <div>
        <button className="btn btn-primary mr-1" type="button" onClick={handleMuteButton}>Mute</button>
        <button className="btn btn-primary mr-1" type="button" onClick={handleVideoButton}>Video</button>
        <button className="btn btn-primary mr-1" type="button" onClick={handleHangUpButton}>HangUp</button>
        <button className="btn btn-primary mr-1" type="button" onClick={handleLockButton}>Lock</button>
      </div>
      <hr />
      <Chat roomId={roomId} messages={messages} sendMessage={sendMessage} />
    </>
  );
};

export default VideoRoom;
