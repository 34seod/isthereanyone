type RoomState = {
  isStarted: boolean
  isMikeOn: boolean
  isCameraOn: boolean
  nickname: string
};

type VideoSrc = {
  socketId: string
  nickname: string
  isCameraOn: boolean
  isMikeOn: boolean
};

type Message = {
  ownedByCurrentUser: boolean
  body: string
  senderId: string
  nickname: string
  sendedAt: string
};

type PeerConnection = {
  [key: string]: {
    pc: RTCPeerConnection | undefined
    isInitiator: boolean
    isStarted: boolean
    isChannelReady: boolean
    nickname: string
  }
};

type ICECandidate = {
  id: string | null
  type: string
  label: number | null | undefined
  candidate: string
};

type RoomStateShare = {
  type: string
  roomState: RoomState
};

type Sender = {
  [key: string]: {
    audio: RTCRtpSender | null,
    video: RTCRtpSender | null,
  }
};

type Action<T> = {
  type: string
  payload: T
};

type Payload = boolean | string | VideoSrc | Message;

type State = {
  flashMessage: boolean
  isCameraOn: boolean
  isMikeOn: boolean
  isNewMessage: boolean
  isScreenShare: boolean
  isStarted: boolean
  lock: boolean
  nickname: string
  showMessage: boolean
  videoSrces: VideoSrce[]
  messages: Messages[]
};

type DispatchType<T> = (args: Action<T>) => Action<T>;
