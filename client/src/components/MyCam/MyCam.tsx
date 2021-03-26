/* eslint-disable no-param-reassign */
import React, { RefObject, useEffect, useRef } from 'react';
import './MyCam.css';

type Props = {
  videoRef: RefObject<HTMLVideoElement>
};

const MyCam = ({ videoRef }: Props) => {
  const pos1 = useRef(0);
  const pos2 = useRef(0);
  const pos3 = useRef(0);
  const pos4 = useRef(0);

  useEffect(() => {
    dragElement(document.getElementById('my-cam-id')!);
  }, []);

  const dragElement = (element: HTMLElement) => {
    element.onmousedown = (e) => dragMouseDown(e, element);
  };

  const dragMouseDown = (e: MouseEvent, element: HTMLElement) => {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3.current = e.clientX;
    pos4.current = e.clientY;
    document.onmouseup = closeDragElement;
    // call a const whenever the cursor moves:
    document.onmousemove = (ev) => elementDrag(ev, element);
  };

  const elementDrag = (e: MouseEvent, element: HTMLElement) => {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1.current = pos3.current - e.clientX;
    pos2.current = pos4.current - e.clientY;
    pos3.current = e.clientX;
    pos4.current = e.clientY;
    // set the element's new position:
    element.style.top = `${element.offsetTop - pos2.current}px`;
    element.style.left = `${element.offsetLeft - pos1.current}px`;
  };

  const closeDragElement = () => {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  };

  return (
    <div id="my-cam-id" className="my-cam rounded p-1 bg-white">
      <video
        id="localVideo"
        className="reverse"
        ref={videoRef}
        autoPlay={true}
        muted={true}
        playsInline={true}
        width="100%"
        height="100%"
      >
        <track kind="captions" />
      </video>
    </div>
  );
};

export default MyCam;
