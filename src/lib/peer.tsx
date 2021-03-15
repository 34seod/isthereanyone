
import * as socket from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:8080';

export default class Peer {
  static ROOM_ID: string;

  static IO: SocketIOClient.Socket;

  constructor(roomId: string) {
    Peer.ROOM_ID = roomId;
    this.connect();
  }

  connect = () => {
    Peer.IO = socket.connect(ENDPOINT, {
      transports: ['websocket'],
    });
    Peer.IO.on('FromAPI', (data: string) => {
      console.log(data);
    });
  };
}
