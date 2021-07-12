import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { VideoSrc } from '../../types';
import Video from '.';

export default {
  title: 'Video',
  component: Video,
} as Meta;

const Template: Story<React.ComponentProps<typeof Video>> = (args) => {
  const [videoSrc, setVideoSrc] = useState<VideoSrc>(args.videoSrc);
  const videoArgs = { ...args, setVideoSrc };

  return <Video {...videoArgs} />;
};

export const Default = Template.bind({});
Default.args = {
  videoSrc: {
    socketId: 'abcdefg',
    nickname: 'Guest',
    isScreenOn: true,
    isVoiceOn: true
  }
};

export const NicknameTruncate = Template.bind({});
NicknameTruncate.args = {
  videoSrc: {
    socketId: 'abcdefg',
    nickname: 'GuestGuestGuestGuestGuestGuestGuestGuestGuestGuestGuestGuest',
    isScreenOn: true,
    isVoiceOn: true
  }
};

export const VoiceOff = Template.bind({});
VoiceOff.args = {
  videoSrc: {
    socketId: 'abcdefg',
    nickname: 'Guest',
    isScreenOn: true,
    isVoiceOn: false
  }
};