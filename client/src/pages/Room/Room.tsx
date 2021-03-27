import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import GreenRoom from '../../components/GreenRoom/GreenRoom';
import VideoRoom from '../../components/VideoRoom/VideoRoom';
import { RoomState, urlEscape } from '../../types';
import './Room.css';

type MatchParams = {
  roomId: string
};

const Room = ({ roomId }: MatchParams) => {
  const history = useHistory();
  const location = useLocation();
  const [roomState, setRoomState] = useState<RoomState>({
    isStarted: false,
    isVoiceOn: true,
    isScreenOn: true,
    nickname: 'Guest'
  });

  useEffect(() => {
    const url = urlEscape(location.pathname);
    if (location.pathname !== `/${url}`) {
      history.push(url);
    }
  }, []);

  return (
    <div className="fix h-100 w-100">
      {
        roomState.isStarted ?
          <VideoRoom
            roomId={roomId}
            roomState={roomState}
            setRoomState={setRoomState}
          /> :
          <GreenRoom
            roomId={roomId}
            roomState={roomState}
            setRoomState={setRoomState}
          />
      }
    </div>
  );
};

export default Room;
