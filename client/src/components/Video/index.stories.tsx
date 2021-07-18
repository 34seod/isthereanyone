import React, { ComponentProps, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import Video from '.';

export default {
  title: 'Video',
  component: Video,
} as Meta;

const Template: Story<ComponentProps<typeof Video>> = (args) => {
  const [, setVideoSrc] = useState<VideoSrc>(args.videoSrc);
  const videoArgs = { ...args, setVideoSrc };

  return <Video {...videoArgs} />;
};

export const Default = Template.bind({});
Default.args = {
  videoSrc: {
    socketId: 'abcdefg',
    nickname: 'Guest',
    isCameraOn: true,
    isMikeOn: true
  }
};

export const NicknameTruncate = Template.bind({});
NicknameTruncate.args = {
  videoSrc: {
    socketId: 'abcdefg',
    nickname: 'GuestGuestGuestGuestGuestGuestGuestGuestGuestGuestGuestGuest',
    isCameraOn: true,
    isMikeOn: true
  }
};

export const VoiceOff = Template.bind({});
VoiceOff.args = {
  videoSrc: {
    socketId: 'abcdefg',
    nickname: 'Guest',
    isCameraOn: true,
    isMikeOn: false
  }
};
