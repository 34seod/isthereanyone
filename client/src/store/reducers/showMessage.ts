import { initialState } from './initialState';
import * as actionTypes from '../actionTypes';

const showMessage = (
  state = initialState.showMessage, action: Action<boolean>
): boolean => {
  switch (action.type) {
    case actionTypes.CHANGE_SHOW_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};

export default showMessage;
