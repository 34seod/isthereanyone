import { combineReducers } from 'redux';
import flashMessage from './flashMessage';
import isCameraOn from './isCameraOn';
import isMikeOn from './isMikeOn';
import isNewMessage from './isNewMessage';
import isScreenShare from './isScreenShare';
import isStarted from './isStarted';
import lock from './lock';
import messages from './messages';
import nickname from './nickname';
import showMessage from './showMessage';
import videoSrces from './videoSrces';

const reducers = combineReducers({
  flashMessage,
  isCameraOn,
  isMikeOn,
  isNewMessage,
  isScreenShare,
  isStarted,
  lock,
  messages,
  nickname,
  showMessage,
  videoSrces,
});

export default reducers;
