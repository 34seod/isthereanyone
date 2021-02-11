import React from 'react';

interface ISquareProps {
  value: string
  win: boolean
  onClick: () => void
}

export const Square = (props: ISquareProps) => (
  <button
    type="button"
    className={`square ${props.win ? 'win-cell' : ''}`}
    onClick={props.onClick}
  >
    {props.value}
  </button>
);
