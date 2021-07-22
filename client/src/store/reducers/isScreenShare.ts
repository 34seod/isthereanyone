import { initialState } from './initialState';
import * as actionTypes from '../actionTypes';

const isScreenShare = (
  state = initialState.isScreenShare, action: Action<boolean>
): boolean => {
  switch (action.type) {
    case actionTypes.CHANGE_IS_SCREEN_SHARE:
      return action.payload;
    default:
      return state;
  }
};

export default isScreenShare;
