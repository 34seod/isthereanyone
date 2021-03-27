/* eslint-disable no-param-reassign */
import React, { RefObject, useEffect, useRef } from 'react';
import useDraggable from '../../hooks/useDraggable';
import './MyCam.css';

type Props = {
  videoRef: RefObject<HTMLVideoElement>
  nickname: string
  isScreenShare: boolean
};

const MyCam = ({ videoRef, nickname, isScreenShare }: Props) => {
  const myCamRef = useRef(document.createElement('div'));
  const { dragElement } = useDraggable(myCamRef, myCamRef);

  useEffect(() => {
    dragElement();
  }, []);

  return (
    <div ref={myCamRef} className="my-cam rounded p-1 bg-white">
      <video
        id="localVideo"
        className={isScreenShare ? '' : 'reverse'}
        ref={videoRef}
        autoPlay={true}
        muted={true}
        playsInline={true}
        width="100%"
        height="100%"
      >
        <track kind="captions" />
      </video>
      <p className="text-truncate my-cam-nickname">{nickname}</p>
    </div>
  );
};

export default MyCam;
