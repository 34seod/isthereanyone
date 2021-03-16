/* eslint-disable max-len */
import React from 'react';
import {
  RouteComponentProps
} from 'react-router-dom';
import Peer from '../lib/peer';

interface IRoomState {
  roomId: String | undefined
  peer: Peer
}
type TParams = { roomId?: string | undefined };

export default class Room extends React.Component<RouteComponentProps<TParams>, IRoomState> {
  private videoRef: React.RefObject<HTMLVideoElement> | null = null;

  constructor(props: RouteComponentProps) {
    super(props);
    const { params } = this.props.match;
    this.state = {
      roomId: params.roomId,
      peer: new Peer(String(params.roomId)),
    };
    this.videoRef = React.createRef<HTMLVideoElement>();
  }

  componentDidMount() {
    this.state.peer.getStream(this.videoRef);
  }

  handleMuteButton = () => {
    console.log('mute');
  };

  handleVideoButton = () => {
    console.log('video');
  };

  handleStartButton = () => {
    console.log('start');
    this.state.peer.start();
  };

  handleHangUpButton = () => {
    console.log('hangup');
  };

  render() {
    return (
      <>
        <h1>{`방 페이지-${this.state.roomId}`}</h1>
        <video id="localVideo" ref={this.videoRef} autoPlay muted playsInline />
        <div id="remote" />
        <div>
          <button className="btn btn-primary mr-1" type="button" onClick={this.handleMuteButton}>Mute</button>
          <button className="btn btn-primary mr-1" type="button" onClick={this.handleVideoButton}>Video</button>
          <button className="btn btn-primary mr-1" type="button" onClick={this.handleStartButton}>Start</button>
          <button className="btn btn-primary mr-1" type="button" onClick={this.handleHangUpButton}>HangUp</button>
        </div>
      </>
    );
  }
}
