type RoomState = {
  isStarted: boolean
  isVoiceOn: boolean
  isScreenOn: boolean
  nickname: string
};

type VideoSrc = {
  socketId: string
  nickname: string
  isScreenOn: boolean
  isVoiceOn: boolean
};

type Message = {
  ownedByCurrentUser: boolean
  body: string
  senderId: string
  nickname: string
  sendedAt: string
};

type Sender = {
  [key: string]: RTCRtpSender
};

type Action<T> = {
  type: string
  payload: T
};

type State = {
  flashMessage: boolean
};

type DispatchType<T> = (args: Action<T>) => Action<T>;
