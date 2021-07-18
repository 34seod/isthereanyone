import { initialState } from './initialState';
import * as actionTypes from '../actionTypes';

const isNewMessage = (
  state = initialState.isNewMessage, action: Action<boolean>
): boolean => {
  switch (action.type) {
    case actionTypes.CHANGE_IS_NEW_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};

export default isNewMessage;
