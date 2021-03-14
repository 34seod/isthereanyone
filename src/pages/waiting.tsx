/* eslint-disable react/no-array-index-key */
import React from 'react';

export default class Waiting extends React.Component {
  static handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //
    console.log(event);
  }

  render() {

    return (
      <div>
        <h1>대기 페이지</h1>
        <form onSubmit={Waiting.handleSubmit}>
          <input id="roomId" type="text" />
          <button type="submit">생성</button>
        </form>
      </div>
    );
  }
}
