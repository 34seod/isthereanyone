import React from 'react';
import Video from '../Video';

type Props = {
  videoSrces: VideoSrc[]
};

const VideoRoom = ({ videoSrces }: Props) => {
  const remoteVideoes = () =>
    videoSrces.map((videoSrc) =>
      <div className="col video-padding" key={`${videoSrc.socketId}`}>
        <Video videoSrc={videoSrc} />
      </div>
    );

  return (
    <>
      {
        videoSrces.length > 0 ?
          <div className="container h-100 d-flex">
            <div className={`m-auto row row-cols-${Math.ceil(Math.sqrt(videoSrces.length))}`}>
              {remoteVideoes()}
            </div>
          </div> :
          <div className="d-flex w-100 h-100">
            <h1 className="m-auto text-white">Nobody in here</h1>
          </div>
      }
    </>
  );
};

export default VideoRoom;
