import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
  faSignOutAlt,
  faSignInAlt
} from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../IconButton';
import { changeIsCameraOn, changeIsMikeOn } from '../../../store/actionCreators';

type Props = {
  handleStartButton: () => void
};

const Buttons: React.FC<Props> = ({ handleStartButton }: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    isCameraOn, isMikeOn
  } = useSelector((state: State) => state, shallowEqual);

  return (
    <div className="d-flex mt-3">
      <div className="ml-auto mr-auto">
        <IconButton
          id="mike-icon-btn"
          icon={isMikeOn ? faMicrophone : faMicrophoneSlash}
          handleOnclick={() => dispatch(changeIsMikeOn(!isMikeOn))}
          className={isMikeOn ? 'btn-success text-white' : 'btn-danger text-white'}
        />
        <IconButton
          id="camera-icon-btn"
          icon={isCameraOn ? faVideo : faVideoSlash}
          handleOnclick={() => dispatch(changeIsCameraOn(!isCameraOn))}
          className={isCameraOn ? 'btn-success text-white' : 'btn-danger text-white'}
        />
        <IconButton
          id="start-icon-btn"
          icon={faSignInAlt}
          handleOnclick={handleStartButton}
          className="btn-primary text-white"
        />
        <IconButton
          id="hangup-icon-btn"
          icon={faSignOutAlt}
          handleOnclick={() => history.push('/')}
          className="btn-danger text-white"
        />
      </div>
    </div>
  );
};

export default Buttons;
