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
          icon={isMikeOn ? faMicrophone : faMicrophoneSlash}
          handleOnclick={() => dispatch(changeIsMikeOn(!isMikeOn))}
          className={isMikeOn ? 'bg-success text-white' : 'bg-danger text-white'}
        />
        <IconButton
          icon={isCameraOn ? faVideo : faVideoSlash}
          handleOnclick={() => dispatch(changeIsCameraOn(!isCameraOn))}
          className={isCameraOn ? 'bg-success text-white' : 'bg-danger text-white'}
        />
        <IconButton
          icon={faSignInAlt}
          handleOnclick={handleStartButton}
          className="bg-primary text-white"
        />
        <IconButton
          icon={faSignOutAlt}
          handleOnclick={() => history.push('/')}
          className="bg-danger text-white"
        />
      </div>
    </div>
  );
};

export default Buttons;
