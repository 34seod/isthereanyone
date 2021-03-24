import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  faMicrophone,
  faMicrophoneSlash, 
  faVideo,
  faVideoSlash,
  faDesktop,
  faLink,
  faSignInAlt,
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
  const videoRef = React.createRef<HTMLVideoElement>();
  const history = useHistory();
  const [videoSrces, setVideoSrces] = useState<VideoSrc[]>([]);
  const [lock, setLock] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(roomState.isMuted);
  const [isRecording, setIsRecording] = 
    useState<boolean>(roomState.isRecording);
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
  }, [roomId]);

  const handleMuteButton = () => {
    setIsMuted((prev) => !prev);
    handleMute();
  };

  const handleVideoButton = () => {
    setIsRecording((prev) => !prev);
    handleScreen();
  };

  const handleHangUpButton = () => {
    hangup();
    history.push('/');
  };

  const handleLockButton = () => {
    setLock((prev) => !prev);
    handleLock();
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
