import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { RoomState } from '../../../types';
import Buttons from '.';

export default {
  title: 'VideoRoomButtons',
  component: Buttons,
} as Meta;

const Template: Story<React.ComponentProps<typeof Buttons>> = (args) => {
  const handleLock = () => null;
  const stopCapture = () => null;
  const handleScreenShare = () => null;
  const handleMute = (isVoiceOn: boolean) => null;
  const handleScreen = (isScreenOn: boolean) => null;
  const [, setLock] = useState<boolean>(false);
  const [, setIsNewMessage] = useState<boolean>(false);
  const [, setShowMessage] = useState<boolean>(false);
  const [, setRoomState] = useState<RoomState>(args.roomState);
  const videoRoomButtonsArgs = {
    ...args, handleLock, stopCapture, handleScreenShare,
    handleMute, handleScreen, setLock, setIsNewMessage,
    setShowMessage, setRoomState
  };

  return <Buttons {...videoRoomButtonsArgs} />;
};

export const Default = Template.bind({});
Default.args = {
  lock: false,
  isNewMessage: false,
  isScreenShare: false,
  roomState: {
    isStarted: false,
    isVoiceOn: true,
    isScreenOn: true,
    nickname: 'Guest'
  }
};

export const VoiceOff = Template.bind({});
VoiceOff.args = {
  lock: false,
  isNewMessage: false,
  isScreenShare: false,
  roomState: {
    isStarted: false,
    isVoiceOn: false,
    isScreenOn: true,
    nickname: 'Guest'
  }
};

export const VideoOff = Template.bind({});
VideoOff.args = {
  lock: false,
  isNewMessage: false,
  isScreenShare: false,
  roomState: {
    isStarted: false,
    isVoiceOn: true,
    isScreenOn: false,
    nickname: 'Guest'
  }
};

export const Locked = Template.bind({});
Locked.args = {
  lock: true,
  isNewMessage: false,
  isScreenShare: false,
  roomState: {
    isStarted: true,
    isVoiceOn: true,
    isScreenOn: true,
    nickname: 'Guest'
  }
};

export const AllOff = Template.bind({});
AllOff.args = {
  lock: true,
  isNewMessage: false,
  isScreenShare: false,
  roomState: {
    isStarted: false,
    isVoiceOn: false,
    isScreenOn: false,
    nickname: 'Guest'
  }
};
