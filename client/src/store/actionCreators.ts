import * as actionTypes from './actionTypes';

export const showFlashMessage = (flashMessage: boolean) => {
  const action: Action<boolean> = {
    type: actionTypes.SHOW_FLASH_MESSAGE,
    payload: flashMessage,
  };

  return action;
};
