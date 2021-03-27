/* eslint-disable no-param-reassign */
import React, { Dispatch, SetStateAction, MutableRefObject } from 'react';

const screenShare = (
  setIsScreenShare: Dispatch<SetStateAction<boolean>>,
  localVideoRef: MutableRefObject<HTMLVideoElement | null | undefined>,
  senderRef: MutableRefObject<RTCRtpSender[]>,
  screenShareStreamRef: MutableRefObject<MediaStream>,
  localStreamRef: MutableRefObject<MediaStream | null>
) => {
  const handleScreenShare = () => {
    const mediaDevices = navigator.mediaDevices as any // eslint-disable-line
    mediaDevices.getDisplayMedia({ video: { cursor: 'always' }, audio: false })
      .then(handleScreenShareSuccess, handleScreenShareError);
  };

  const handleScreenShareError = (e: Error) => {
    setIsScreenShare(false);
    console.log('getDisplayMedia error: ', e.toString());
  };

  const handleScreenShareSuccess = (stream: MediaStream) => {
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;
    screenShareStreamRef.current = stream;
    senderRef.current.forEach((sender) => {
      if (sender?.track?.kind === 'video') {
        sender.replaceTrack(stream.getVideoTracks()[0]);
      }
    });

    stream.getVideoTracks()[0].addEventListener('ended', () => {
      stopCapture();
    });
  };

  const stopCapture = () => {
    senderRef.current.forEach((sender) => {
      if (sender?.track?.kind === 'video' && localStreamRef.current !== null) {
        sender.replaceTrack(localStreamRef.current.getVideoTracks()[0]);
      }
    });

    screenShareStreamRef.current.getTracks()
      .forEach((track: MediaStreamTrack) => track.stop());

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
    }
    setIsScreenShare(false);
  };

  return { handleScreenShare, stopCapture };
};

export default screenShare;
