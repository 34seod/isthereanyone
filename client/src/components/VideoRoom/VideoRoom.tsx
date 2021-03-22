import React, { useEffect } from 'react';
import useSocket from '../../lib/useSocket';
import './VideoRoom.css';

type MatchParams = {
  roomId: string
};

const VideoRoom = ({ roomId }: MatchParams) => {
  const videoRef = React.createRef<HTMLVideoElement>();
  const { messages, sendMessage, getStream, hangup } = useSocket('');

  useEffect(() => {
    getStream(videoRef);
  }, []);

  const handleMuteButton = () => {
    console.log('mute');
  };

  const handleVideoButton = () => {
    console.log('video');
  };

  const handleHangUpButton = () => {
    console.log('hangup');
  };

  return (
    <>
      <h1>{`방 페이지-${roomId}`}</h1>
      <video id="localVideo" ref={videoRef} autoPlay muted playsInline />
      <div id="remote" />
      <div>
        <button className="btn btn-primary mr-1" type="button" onClick={handleMuteButton}>Mute</button>
        <button className="btn btn-primary mr-1" type="button" onClick={handleVideoButton}>Video</button>
        <button className="btn btn-primary mr-1" type="button" onClick={handleHangUpButton}>HangUp</button>
      </div>
    </>
  );
};

export default VideoRoom;
