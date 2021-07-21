import { initialState } from './initialState';
import * as actionTypes from '../actionTypes';

const isCameraOn = (
  state = initialState.isCameraOn, action: Action<boolean>
): boolean => {
  switch (action.type) {
    case actionTypes.CHANGE_IS_CAMERA_ON:
      return action.payload;
    default:
      return state;
  }
};

export default isCameraOn;
