import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import GreenRoom from '../components/GreenRoom/GreenRoom';
import VideoRoom from '../components/VideoRoom/VideoRoom';
import { RoomState, urlEscape } from '../types';

type MatchParams = {
  roomId: string
};

const Room = ({ roomId }: MatchParams) => {
  const history = useHistory();
  const location = useLocation();
  const [roomState, setRoomState] = useState<RoomState>({
    isStarted: false,
    isMuted: false,
    isRecording: false,
    nickname: 'Guest'
  });

  useEffect(() => {
    const url = urlEscape(location.pathname);
    if (location.pathname !== url) {
      history.push(url);
    }
  }, []);

  return (
    <>
      {
        roomState.isStarted ?
          <VideoRoom
            roomId={roomId}
            roomState={roomState}
          /> :
          <GreenRoom
            roomId={roomId}
            roomState={roomState}
            setRoomState={setRoomState}
          />
      }
    </>
  );
};

export default Room;
