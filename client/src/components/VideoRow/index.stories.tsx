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
    { socketId: 'socketId', nickname: 'user', isScreenOn: true, isVoiceOn: true }
  ]
};

export const Two = Template.bind({});
Two.args = {
  videoSrces: [
    { socketId: 'socketId1', nickname: 'user1', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId2', nickname: 'user2', isScreenOn: true, isVoiceOn: true }
  ]
};

export const TwoRow = Template.bind({});
TwoRow.args = {
  videoSrces: [
    { socketId: 'socketId1', nickname: 'user1', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId2', nickname: 'user2', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId3', nickname: 'user3', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId4', nickname: 'user4', isScreenOn: true, isVoiceOn: true }
  ]
};

export const ThreeRow = Template.bind({});
ThreeRow.args = {
  videoSrces: [
    { socketId: 'socketId1', nickname: 'user1', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId2', nickname: 'user2', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId3', nickname: 'user3', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId4', nickname: 'user4', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId5', nickname: 'user5', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId6', nickname: 'user6', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId7', nickname: 'user7', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId8', nickname: 'user8', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId9', nickname: 'user9', isScreenOn: true, isVoiceOn: true }
  ]
};

export const FourRow = Template.bind({});
FourRow.args = {
  videoSrces: [
    { socketId: 'socketId1', nickname: 'user1', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId2', nickname: 'user2', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId3', nickname: 'user3', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId4', nickname: 'user4', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId5', nickname: 'user5', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId6', nickname: 'user6', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId7', nickname: 'user7', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId8', nickname: 'user8', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId9', nickname: 'user9', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId10', nickname: 'user10', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId11', nickname: 'user11', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId12', nickname: 'user12', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId13', nickname: 'user13', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId14', nickname: 'user14', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId15', nickname: 'user15', isScreenOn: true, isVoiceOn: true },
    { socketId: 'socketId16', nickname: 'user16', isScreenOn: true, isVoiceOn: true }
  ]
};