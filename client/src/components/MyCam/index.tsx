/* eslint-disable no-param-reassign */
import React, { RefObject, useEffect, useRef } from 'react';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import useDraggable from '../../hooks/useDraggable';
import { showFlashMessage } from '../../store/actionCreators';
import './index.css';

type Props = {
  videoRef: RefObject<HTMLVideoElement>
  nickname: string
  isScreenShare: boolean
  roomId: string
};

const MyCam = ({
  videoRef,
  nickname,
  isScreenShare,
  roomId,
}: Props) => {
  const myCamRef = useRef(document.createElement('div'));
  const { dragElement } = useDraggable(myCamRef, myCamRef);
  const dispatch = useDispatch();

  useEffect(() => {
    dragElement();
  }, [dragElement]);

  const handleLinkCopyButton = () => {
    const el = document.createElement('textarea');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    dispatch(showFlashMessage(true));
  };

  return (
    <div ref={myCamRef} className="my-cam rounded p-1 bg-white">
      <button type="button" className="rounded room-title-btn p-1" onClick={handleLinkCopyButton}>
        <p className="room-title-size text-truncate m-0" title={`${roomId} click to copy`}>
          <FontAwesomeIcon icon={faLink} />
          {roomId}
        </p>
      </button>
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
      <p className="text-truncate my-cam-nickname" title={nickname}>{nickname}</p>
    </div>
  );
};

export default MyCam;
