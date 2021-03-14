/* eslint-disable max-len */
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface INewState {
  roomId: String
}

export default class New extends React.Component<RouteComponentProps, INewState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      roomId: '',
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ roomId: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.history.push(`/${this.state.roomId}`);
  };

  render() {
    return (
      <>
        <h1>시작페이지</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}
