import React, { useEffect, Dispatch, SetStateAction, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setInterval } from 'timers';
import useSocket from '../../lib/useSocket';
import { RoomState, VideoSrc } from '../../types';
import Chat from '../Chat/Chat';
import Video from '../Video/Video';
import './VideoRoom.css';

type Props = {
  roomId: string
  roomState: RoomState
  setRoomState: Dispatch<SetStateAction<RoomState>>
};

const VideoRoom = ({ roomId, roomState, setRoomState }: Props) => {
  const videoRef = React.createRef<HTMLVideoElement>();
  const history = useHistory();
  const [videoSrces, setVideoSrces] = useState<VideoSrc[]>([]);
  const {
    messages, sendMessage, getStream, hangup
  } = useSocket(roomId, roomState, setVideoSrces);

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
    hangup();
    window.location.href = '/';
  };

  return (
    <>
      <h1>{`방 페이지-${roomId}`}</h1>
      <video id="localVideo" ref={videoRef} autoPlay muted playsInline />
      {videoSrces.map((videoSrc) => <Video key={`${videoSrc.socketId}`} videoSrc={videoSrc} />)}
      <div>
        <button className="btn btn-primary mr-1" type="button" onClick={handleMuteButton}>Mute</button>
        <button className="btn btn-primary mr-1" type="button" onClick={handleVideoButton}>Video</button>
        <button className="btn btn-primary mr-1" type="button" onClick={handleHangUpButton}>HangUp</button>
      </div>
      <hr />
      <Chat roomId={roomId} messages={messages} sendMessage={sendMessage} />
    </>
  );
};

export default VideoRoom;
