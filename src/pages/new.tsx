/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';

interface INewState {
  roomId: String
}

export default class New extends React.Component<{}, INewState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      roomId: '',
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
