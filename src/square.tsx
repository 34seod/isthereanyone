import React from 'react';

interface ISquareProps {
  value: string
  onClick: () => void
}

export const Square = (props: ISquareProps) => (
  <button
    type="button"
    className="square"
    onClick={props.onClick}
  >
    {props.value}
  </button>
);
