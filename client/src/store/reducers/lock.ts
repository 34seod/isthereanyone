import { initialState } from './initialState';
import * as actionTypes from '../actionTypes';

const lock = (
  state = initialState.lock, action: Action<boolean>
): boolean => {
  switch (action.type) {
    case actionTypes.CHANGE_LOCK:
      return action.payload;
    default:
      return state;
  }
};

export default lock;
