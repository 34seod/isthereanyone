import { initialState } from './initialState';
import * as actionTypes from '../actionTypes';

const isStarted = (
  state = initialState.isStarted, action: Action<boolean>
): boolean => {
  switch (action.type) {
    case actionTypes.CHANGE_IS_STARTED:
      return action.payload;
    default:
      return state;
  }
};

export default isStarted;
