/* eslint-disable max-len */
import React from 'react';
import {
  RouteComponentProps
} from 'react-router-dom';

interface INewState {
  roomId: String | undefined
}
type TParams = { roomId?: string | undefined };

export default class Room extends React.Component<RouteComponentProps<TParams>, INewState> {
  constructor(props: RouteComponentProps) {
    super(props);
    const { params } = this.props.match;
    this.state = {
      roomId: params.roomId
    };
  }

  static handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log(event);
  }

  render() {

    return (
      <div>
        <h1>{`방 페이지-${this.state.roomId}`}</h1>
        <form onSubmit={Room.handleSubmit}>
          <input id="roomId" type="text" />
          <button type="submit">생성</button>
        </form>
      </div>
    );
  }
}
