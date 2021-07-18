import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GreenRoom from '../../components/GreenRoom';
import VideoRoom from '../../components/VideoRoom';
import { urlEscape } from '../../sharedFunctions';
import './index.css';

const Room: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const isStarted = useSelector((state: State) => state.isStarted);

  useEffect(() => {
    const url = urlEscape(location.pathname);
    if (location.pathname !== `/${url}`) {
      history.push(url);
    }
  }, [history, location.pathname]);

  return (
    <div className="fix">
      {isStarted ? <VideoRoom /> : <GreenRoom />}
    </div>
  );
};

export default Room;
