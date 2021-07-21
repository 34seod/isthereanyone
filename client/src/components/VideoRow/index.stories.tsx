import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import VideoRow from '.';

export default {
  title: 'VideoRow',
  component: VideoRow,
} as Meta;

type VideoRowStory = Story<ComponentProps<typeof VideoRow>>;
const Template: VideoRowStory = (args) => <VideoRow {...args} />;

export const Default = Template.bind({});
Default.args = {
  videoSrces: [
    { socketId: 'socketId', nickname: 'user', isCameraOn: true, isMikeOn: true }
  ]
};

export const Two = Template.bind({});
Two.args = {
  videoSrces: [
    { socketId: 'socketId1', nickname: 'user1', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId2', nickname: 'user2', isCameraOn: true, isMikeOn: true }
  ]
};

export const TwoRow = Template.bind({});
TwoRow.args = {
  videoSrces: [
    { socketId: 'socketId1', nickname: 'user1', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId2', nickname: 'user2', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId3', nickname: 'user3', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId4', nickname: 'user4', isCameraOn: true, isMikeOn: true }
  ]
};

export const ThreeRow = Template.bind({});
ThreeRow.args = {
  videoSrces: [
    { socketId: 'socketId1', nickname: 'user1', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId2', nickname: 'user2', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId3', nickname: 'user3', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId4', nickname: 'user4', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId5', nickname: 'user5', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId6', nickname: 'user6', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId7', nickname: 'user7', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId8', nickname: 'user8', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId9', nickname: 'user9', isCameraOn: true, isMikeOn: true }
  ]
};

export const FourRow = Template.bind({});
FourRow.args = {
  videoSrces: [
    { socketId: 'socketId1', nickname: 'user1', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId2', nickname: 'user2', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId3', nickname: 'user3', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId4', nickname: 'user4', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId5', nickname: 'user5', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId6', nickname: 'user6', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId7', nickname: 'user7', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId8', nickname: 'user8', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId9', nickname: 'user9', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId10', nickname: 'user10', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId11', nickname: 'user11', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId12', nickname: 'user12', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId13', nickname: 'user13', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId14', nickname: 'user14', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId15', nickname: 'user15', isCameraOn: true, isMikeOn: true },
    { socketId: 'socketId16', nickname: 'user16', isCameraOn: true, isMikeOn: true }
  ]
};