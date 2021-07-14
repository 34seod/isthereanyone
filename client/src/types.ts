import { Dispatch, SetStateAction } from 'react';

export type RoomState = {
  isStarted: boolean
  isVoiceOn: boolean
  isScreenOn: boolean
  nickname: string
};

export type VideoSrc = {
  socketId: string
  nickname: string
  isScreenOn: boolean
  isVoiceOn: boolean
};

export type Message = {
  ownedByCurrentUser: boolean
  body: string
  senderId: string
  nickname: string
  sendedAt: string
};

export type Sender = {
  [key: string]: RTCRtpSender
};

export type SetState<T> = Dispatch<SetStateAction<T>>;

export const urlEscape = (roomId: string) => (
  roomId.replace(/(`|~|!|@|#|\$|%|\^|&|\*|\(|\)|-|_|=|\+|{|}|\[|\]|\\|\||'|"|;|:|,|<|>|\.|\/|\?|\s)/g, '')
);

export const formatDate = (date: Date) =>
  `${String(date.getFullYear()).slice(2, 4)}/${String(
    date.getMonth() + 1
  ).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(
    date.getHours()
  ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(
    date.getSeconds()
  ).padStart(2, '0')}`;
