/* eslint-disable react/no-array-index-key */
import React from 'react';

export default class New extends React.Component {
  static handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //
    console.log(event);
  }

  render() {

    return (
      <>
        <h1>시작페이지</h1>
        <form onSubmit={New.handleSubmit}>
          <input id="roomId" type="text" />
          <button type="submit">생성</button>
        </form>
      </>
    );
  }
}
