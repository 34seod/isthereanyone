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
    movePartRef.current.ontouchstart = dragTouchDown;
  };

  const dragMouseDown = (e: MouseEvent) => {
    const event = e || window.event;
    event.preventDefault();
    // get the mouse cursor position at startup:
    pos3.current = event.clientX;
    pos4.current = event.clientY;
    document.onmouseup = closeDragElement;
    // call a const whenever the cursor moves:
    document.onmousemove = elementDragMouse;
  };

  const dragTouchDown = (e: TouchEvent) => {
    e.preventDefault();
    const event = e.targetTouches[0];
    // get the mouse cursor position at startup:
    pos3.current = event.clientX;
    pos4.current = event.clientY;
    document.ontouchmove = elementDragTouch;
    document.ontouchend = closeDragElement;
  };

  const elementDragMouse = (e: MouseEvent) => {
    e.preventDefault();
    const event = e || window.event;
    calculateCoordinate(event.clientX, event.clientY);
  };

  const elementDragTouch = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.targetTouches[0];
    calculateCoordinate(touch.clientX, touch.clientY);
  };

  const calculateCoordinate = (x: number, y: number) => {
    // calculate the new cursor position:
    pos1.current = pos3.current - x;
    pos2.current = pos4.current - y;
    pos3.current = x;
    pos4.current = y;
    // set the element's new position:
    mainRef.current.style.top = `${mainRef.current.offsetTop - pos2.current}px`;
    mainRef.current.style.left = `${mainRef.current.offsetLeft - pos1.current}px`;

  };

  const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchmove = null;
    document.ontouchend = null;
  };

  return { dragElement };
};

export default useDraggable;
