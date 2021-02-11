/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Square } from './square';

interface IBoardProps {
  squares: string[]
  winCell: number[]
  handleClick: (i: number) => void
}

export default class Board extends React.Component<IBoardProps> {
  renderSquare(i: number) {
    return (
      <Square
        value={this.props.squares[i]}
        win={this.props.winCell.includes(i)}
        onClick={() => this.props.handleClick(i)}
      />
    );
  }

  render() {
    const indexs = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const row = [0, 1, 2].map((_, i: number) => {
      const col = indexs.splice(0, 3).map((num, j) => (
        <React.Fragment key={`square-col-${j}`}>
          {this.renderSquare(num)}
        </React.Fragment>
      ));
      return (
        <div key={`square-row-${i}`} className="board-row">
          {col}
        </div>
      );
    });
    return (
      <div>
        {row}
      </div>
    );
  }
}
