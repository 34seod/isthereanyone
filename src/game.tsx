/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-state */
import React from 'react';
import Board from './board';

interface IGameState {
  history: { squares: string[] }[]
  stepNumber: number
  xIsNext: boolean
}

export default class Game extends React.Component<{}, IGameState> {
  static calculateWinner(squares: string[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 5],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  constructor(props: {}) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i: number) {
    const { history, stepNumber } = this.state;
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[stepNumber];
    if (Game.calculateWinner(current.squares) || current.squares[i]) {
      return;
    }
    this.setState((prevState) => {
      const { xIsNext } = prevState;

      const newSquares = current.squares.slice();
      newSquares[i] = xIsNext ? 'X' : 'O';
      return ({
        history: newHistory.concat({
          squares: newSquares
        }),
        stepNumber: newHistory.length,
        xIsNext: !xIsNext
      });
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const { history, stepNumber, xIsNext } = this.state;
    const current = history[stepNumber];
    const winner = Game.calculateWinner(current.squares);
    const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

    const moves = history.map((_, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      return (
        <li key={`step-${move}`}>
          <button type="button" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            handleClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
