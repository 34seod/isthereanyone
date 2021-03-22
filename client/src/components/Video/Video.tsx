import React from 'react';
import { VideoSrc } from '../../types';
import './Video.css';

type Props = {
  videoSrc: VideoSrc
};

const Video = ({ videoSrc }: Props) => (
  <>
    <video id={`remoteVideo-${videoSrc.socketId}`} autoPlay muted playsInline />
    <p>{videoSrc.nickName}</p>
  </>
);

export default Video;
