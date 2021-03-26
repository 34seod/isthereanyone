import React, { useEffect, Dispatch, SetStateAction } from 'react';
import './FlashMessage.css';

type Props = {
  message: string
  during: number
  unmount: Dispatch<SetStateAction<boolean>>
};

const FlashMessage = ({ message, during, unmount }: Props) => {
  useEffect(() => {
    setTimeout(() => unmount(false), during);
  });

  return (
    <div className="fixed-top">{message}</div>
  );
};

export default FlashMessage;
