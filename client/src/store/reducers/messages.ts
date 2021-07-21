import { initialState } from './initialState';
import * as actionTypes from '../actionTypes';

const messages = (
  state = initialState.messages, action: Action<Message>
): Message[] => {
  switch (action.type) {
    case actionTypes.ADD_MESSAGE:
      return [
        ...state,
        action.payload
      ];
    case actionTypes.INITIALIZE_MESSAGE:
      return initialState.messages;
    default:
      return state;
  }
};

export default messages;
