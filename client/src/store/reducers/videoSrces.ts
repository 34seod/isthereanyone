import { initialState } from './initialState';
import * as actionTypes from '../actionTypes';

const videoSrces = (
  state = initialState.videoSrces, action: Action<VideoSrc[]>
): VideoSrc[] => {
  switch (action.type) {
    case actionTypes.CHANGE_VIDEO_SRCES:
      return action.payload;
    default:
      return state;
  }
};

export default videoSrces;
