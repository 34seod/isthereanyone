import { initialState } from './initialState';
import * as actionTypes from '../actionTypes';

const nickname = (
  state = initialState.nickname, action: Action<string>
): string => {
  switch (action.type) {
    case actionTypes.CHANGE_NICKNAME:
      return action.payload;
    default:
      return state;
  }
};

export default nickname;
