import { faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { VideoSrc } from '../../types';
import './Video.css';

type Props = {
  videoSrc: VideoSrc
};

const Video = ({ videoSrc }: Props) => (
  <div className="position-relative video-zindex">
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
    <p className={`text-truncate nickname ${videoSrc.isScreenOn ? '' : 'screen-off' }`} title={videoSrc.nickname}>{videoSrc.nickname}</p>
    {videoSrc.isVoiceOn ? null : <FontAwesomeIcon icon={faMicrophoneSlash} className="mute rounded-circle bg-danger text-white" />}
  </div>
);

export default Video;
