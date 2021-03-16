/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

interface INewState {
  roomId: String
}

export default class New extends React.Component<{}, INewState> {
  private socket = io.io('localhost:3001');

  constructor(props: {}) {
    super(props);

    this.state = {
      roomId: '',
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.socket.emit('message', event.target.value);
    this.setState({ roomId: event.target.value });
  };

  render() {
    return (
      <>
        <h1>시작페이지</h1>
        <input type="text" onChange={this.handleChange} />
        <Link to={`/${this.state.roomId}`}>시작</Link>
      </>
    );
  }
}
