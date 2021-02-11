/* eslint-disable react/no-array-index-key */
import React from 'react';
import Board from './board';

interface IGameState {
  history: { squares: string[], index: number | null }[]
  stepNumber: number
  xIsNext: boolean
  sort: boolean
  winCell: number[]
}

export default class Game extends React.Component<{}, IGameState> {
  static checkWinner(
    squares: string[],
    winner: { winner: string, line: number[] } | null,
    xIsNext: boolean
  ) {
    let state;
    if (winner) {
      state = `Winner: ${winner.winner}`;
    } else if (squares.filter((s) => s).length === 9) {
      state = 'draw';
    } else {
      state = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    return state;
  }

  static convertToCoord(index: number | null) {
    switch (index) {
      case 0:
        return '0,0';
      case 1:
        return '0,1';
      case 2:
        return '0,2';
      case 3:
        return '1,0';
      case 4:
        return '1,1';
      case 5:
        return '1,2';
      case 6:
        return '2,0';
      case 7:
        return '2,1';
      case 8:
        return '2,2';
      default:
        return '0,0';
    }
  }

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
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  }

  constructor(props: {}) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        index: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      sort: false,
      winCell: []
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
      const winner = Game.calculateWinner(newSquares);

      return ({
        history: newHistory.concat({
          squares: newSquares,
          index: i
        }),
        stepNumber: newHistory.length,
        xIsNext: !xIsNext,
        winCell: winner ? winner.line : []
      });
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  changeSort() {
    this.setState((pervState) => ({ sort: !pervState.sort }));
  }

  render() {
    const { history, stepNumber, xIsNext, sort, winCell } = this.state;
    const current = history[stepNumber];
    const winner = Game.calculateWinner(current.squares);
    const status = Game.checkWinner(current.squares, winner, xIsNext);

    const moves = history.map((h, move) => {
      const desc = move ? `Go to move #${move} - ${Game.convertToCoord(h.index)}` : 'Go to game start';
      const isCurrent = move === stepNumber;
      return (
        <li key={`step-${move}`}>
          <button type="button" className={isCurrent ? 'selected' : ''} onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });
    if (sort) moves.reverse();

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winCell={winCell}
            handleClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <button type="button" onClick={() => this.changeSort()}>정렬</button>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
