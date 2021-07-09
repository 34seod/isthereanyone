import { faMicrophoneSlash, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useEffect } from 'react';
import { VideoSrc } from '../../types';
import './index.css';

type Props = {
  videoSrc: VideoSrc
};

interface IVideoElement extends HTMLVideoElement {
  webkitRequestFullscreen?: () => void
  msRequestFullscreen?: () => void
  webkitEnterFullscreen?: () => void
}

const Video = ({ videoSrc }: Props) => {
  const videoRef = useRef<IVideoElement>(document.createElement('video'));

  useEffect(() => {
    videoRef.current.addEventListener('pause', () => {
      videoRef.current?.play();
    }, false);
  }, []);

  const fullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) { /* Safari */
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.webkitEnterFullscreen) { /* Mobile Safari */
      videoRef.current.webkitEnterFullscreen();
    } else if (videoRef.current.msRequestFullscreen) { /* IE11 */
      videoRef.current.msRequestFullscreen();
    }
  };

  return (
    <div className="position-relative">
      <video
        ref={videoRef}
        id={`remoteVideo-${videoSrc.socketId}`}
        autoPlay={true}
        muted={false}
        playsInline={true}
        width="100%"
        height="100%"
      >
        <track kind="captions" />
      </video>
      <p className="text-truncate nickname" title={videoSrc.nickname}>{videoSrc.nickname}</p>
      <div className="video-button p-2 w-100 d-flex justify-content-between">
        {videoSrc.isVoiceOn ? <div /> : <div className="btn"><FontAwesomeIcon icon={faMicrophoneSlash} className="line-height-mute mr-1 text-white" /></div>}
        <button type="button" className="btn " onClick={fullscreen}>
          <FontAwesomeIcon icon={faExpand} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Video;
