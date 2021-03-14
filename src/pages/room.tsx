/* eslint-disable react/no-array-index-key */
import React from 'react';

export default class Room extends React.Component {
  static handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //
    console.log(event);
  }

  render() {

    return (
      <div>
        <h1>방 페이지</h1>
        <form onSubmit={Room.handleSubmit}>
          <input id="roomId" type="text" />
          <button type="submit">생성</button>
        </form>
      </div>
    );
  }
}
