import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showFlashMessage } from '../../store/actionCreators';
import './index.css';

type Props = {
  message: string
  during?: number
};

const FlashMessage: React.FC<Props> = ({ message, during }: Props) => {
  const dispatch = useDispatch();
  const timeIds = useRef<number[]>([]);
  const show = useSelector((state: State) => state.flashMessage);

  useEffect(() => {
    const id = setTimeout(() => {
      timeIds.current.forEach((tid) => clearTimeout(tid));
      timeIds.current = [];
      dispatch(showFlashMessage(false));
    }, during);
    timeIds.current.push(id);
  }, [show, dispatch, during]);

  return (
    <>
      {show && <div className="flash-message fixed-top">{message}</div>}
    </>
  );
};

FlashMessage.defaultProps = {
  during: 3000
};

export default FlashMessage;
