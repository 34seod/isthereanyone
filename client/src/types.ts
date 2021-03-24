export type RoomState = {
  isStarted: boolean
  isMuted: boolean
  isRecording: boolean
  nickName: string
};

export type VideoSrc = {
  socketId: string
  nickName: string
};

export const urlEscape = (roomId: string) => (
  roomId.replace(/(`|~|!|@|#|\$|%|\^|&|\*|\(|\)|-|_|=|\+|{|}|\[|\]|\\|\||'|"|;|:|,|<|>|\.|\/|\?|\s)/g, '')
);
