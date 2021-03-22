import React, { useEffect, Dispatch, SetStateAction } from 'react';
import useSocket from '../../lib/useSocket';
import { RoomState } from '../../types';
import './VideoRoom.css';

type Props = {
  roomId: string
  roomState: RoomState
  setRoomState: Dispatch<SetStateAction<RoomState>>
};

const VideoRoom = ({ roomId, roomState, setRoomState }: Props) => {
  const videoRef = React.createRef<HTMLVideoElement>();
  const {
    messages, sendMessage, getStream, hangup
  } = useSocket(roomId, roomState);

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
