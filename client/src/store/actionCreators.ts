/* eslint-disable max-len */
import * as actionTypes from './actionTypes';

export const showFlashMessage = (flashMessage: boolean) => basicAction(actionTypes.SHOW_FLASH_MESSAGE, flashMessage);
export const changeIsCameraOn = (isCameraOn: boolean) => basicAction(actionTypes.CHANGE_IS_CAMERA_ON, isCameraOn);
export const changeIsMikeOn = (isMikeOn: boolean) => basicAction(actionTypes.CHANGE_IS_MIKE_ON, isMikeOn);
export const changeIsNewMessage = (isNewMessage: boolean) => basicAction(actionTypes.CHANGE_IS_NEW_MESSAGE, isNewMessage);
export const changeIsScreenShare = (isScreenShare: boolean) => basicAction(actionTypes.CHANGE_IS_SCREEN_SHARE, isScreenShare);
export const changeIsStarted = (isStarted: boolean) => basicAction(actionTypes.CHANGE_IS_STARTED, isStarted);
export const changeLock = (lock: boolean) => basicAction(actionTypes.CHANGE_LOCK, lock);
export const changeNickname = (nickname: string) => basicAction(actionTypes.CHANGE_NICKNAME, nickname);
export const changeShowMessage = (showMessage: boolean) => basicAction(actionTypes.CHANGE_SHOW_MESSAGE, showMessage);
export const changeVideoSrces = (videoSrces: VideoSrc[]) => basicAction(actionTypes.CHANGE_VIDEO_SRCES, videoSrces);

const basicAction = (type: string, payload: Payload) => ({ type, payload });
