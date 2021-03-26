import React from 'react';
import { VideoSrc } from '../../types';
import './Video.css';

type Props = {
  videoSrc: VideoSrc
};

const Video = ({ videoSrc }: Props) => (
  <div className="position-relative">
    <video
      id={`remoteVideo-${videoSrc.socketId}`}
      autoPlay={true}
      muted={false}
      playsInline={true}
      controls={true}
      width="100%"
      height="100%"
    >
      <track kind="captions" />
    </video>
    <p className="nickname text-truncate">{videoSrc.nickname}</p>
  </div>
);

export default Video;
