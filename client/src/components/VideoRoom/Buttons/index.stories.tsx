import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import Buttons from '.';

export default {
  title: 'VideoRoomButtons',
  component: Buttons,
} as Meta;

const Template: Story<ComponentProps<typeof Buttons>> = (args) => {
  const handleLock = () => null;
  const stopCapture = () => null;
  const handleScreenShare = () => null;
  const handleMute = (isVoiceOn: boolean) => null;
  const handleScreen = (isScreenOn: boolean) => null;
  const videoRoomButtonsArgs = {
    ...args, handleLock, stopCapture, handleScreenShare,
    handleMute, handleScreen
  };

  return <Buttons {...videoRoomButtonsArgs} />;
};

export const Default = Template.bind({});

export const VoiceOff = Template.bind({});

export const VideoOff = Template.bind({});

export const Locked = Template.bind({});

export const AllOff = Template.bind({});
