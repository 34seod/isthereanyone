import { faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { VideoSrc } from '../../types';
import './index.css';

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
    <div className="bg-dark d-flex justify-content-between align-items-center">
      <p className="text-truncate nickname" title={videoSrc.nickname}>{videoSrc.nickname}</p>
      {videoSrc.isVoiceOn ? null : <FontAwesomeIcon icon={faMicrophoneSlash} className="mr-1 mute rounded-circle bg-danger text-white" />}
    </div>
  </div>
);

export default Video;
