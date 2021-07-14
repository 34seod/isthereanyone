import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import GreenRoom from '../../components/GreenRoom';
import VideoRoom from '../../components/VideoRoom';
import { RoomState, urlEscape } from '../../types';
import './index.css';

const Room = () => {
  const { roomId } = useParams< { roomId: string } >();
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
  }, [history, location.pathname]);

  return (
    <div className="fix">
      {
        roomState.isStarted ?
          <VideoRoom
            roomId={roomId}
            roomState={roomState}
            setRoomState={setRoomState}
          /> :
          <GreenRoom
            roomState={roomState}
            setRoomState={setRoomState}
          />
      }
    </div>
  );
};

export default Room;
