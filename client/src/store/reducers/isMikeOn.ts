import { initialState } from './initialState';
import * as actionTypes from '../actionTypes';

const isMikeOn = (
  state = initialState.isMikeOn, action: Action<boolean>
): boolean => {
  switch (action.type) {
    case actionTypes.CHANGE_IS_MIKE_ON:
      return action.payload;
    default:
      return state;
  }
};

export default isMikeOn;
