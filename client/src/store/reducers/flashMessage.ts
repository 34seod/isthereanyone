import { initialState } from './initialState';
import * as actionTypes from '../actionTypes';

const flashMessage = (
  state = initialState.flashMessage, action: Action<boolean>
): boolean => {
  switch (action.type) {
    case actionTypes.SHOW_FLASH_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};

export default flashMessage;
