import { initialState } from './initialState';
import * as actionTypes from '../actionTypes';

const videoSrces = (
  state: VideoSrc[] = initialState.videoSrces, action: Action<VideoSrc>
): VideoSrc[] => {
  const { socketId, isCameraOn, isMikeOn } = action.payload || {};
  const prevData = state.slice();
  const videoSrc = prevData.find((src) => src.socketId === socketId);

  switch (action.type) {
    case actionTypes.ADD_VIDEO_SRCES:
      if (!videoSrc) prevData.push(action.payload);
      return prevData;
    case actionTypes.UPDATE_VIDEO_SRCES:
      if (videoSrc) {
        videoSrc.isCameraOn = isCameraOn;
        videoSrc.isMikeOn = isMikeOn;
      } else {
        prevData.push(action.payload);
      }
      return prevData;
    case actionTypes.REMOVE_VIDEO_SRCES:
      return prevData.filter((src) => src.socketId !== socketId);
    default:
      return state;
  }
};

export default videoSrces;
