/* eslint-disable no-param-reassign */
import React, { useRef, MutableRefObject } from 'react';

const useDraggable = (
  mainRef: MutableRefObject<HTMLDivElement>,
  movePartRef: MutableRefObject<HTMLDivElement>
) => {
  const pos1 = useRef(0);
  const pos2 = useRef(0);
  const pos3 = useRef(0);
  const pos4 = useRef(0);

  const dragElement = () => {
    movePartRef.current.onmousedown = dragMouseDown;
  };

  const dragMouseDown = (e: MouseEvent) => {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3.current = e.clientX;
    pos4.current = e.clientY;
    document.onmouseup = closeDragElement;
    // call a const whenever the cursor moves:
    document.onmousemove = elementDrag;
  };

  const elementDrag = (e: MouseEvent) => {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1.current = pos3.current - e.clientX;
    pos2.current = pos4.current - e.clientY;
    pos3.current = e.clientX;
    pos4.current = e.clientY;
    // set the element's new position:
    mainRef.current.style.top = `${mainRef.current.offsetTop - pos2.current}px`;
    mainRef.current.style.left = `${mainRef.current.offsetLeft - pos1.current}px`;
  };

  const closeDragElement = () => {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  };

  return { dragElement };
};

export default useDraggable;
