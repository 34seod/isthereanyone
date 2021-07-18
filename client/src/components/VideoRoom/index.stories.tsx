import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import VideoRoom from '.';

export default {
  title: 'VideoRoom',
  component: VideoRoom,
} as Meta;

type VideoRoomStory = Story<ComponentProps<typeof VideoRoom>>;
const Template: VideoRoomStory = (args) => <VideoRoom />;
export const Default = Template.bind({});
