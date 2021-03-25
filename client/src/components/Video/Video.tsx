import React from 'react';
import { VideoSrc } from '../../types';
import './Video.css';

type Props = {
  videoSrc: VideoSrc
};

const Video = ({ videoSrc }: Props) => (
  <>
    <video
      id={`remoteVideo-${videoSrc.socketId}`}
      autoPlay={true}
      muted={false}
      playsInline={true}
      controls={true}
      width={320}
      height={240}
    >
      <track kind="captions" />
    </video>
    <p>{videoSrc.nickname}</p>
  </>
);

export default Video;
