import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import Buttons from '.';

export default {
  title: 'GreenRoomButtons',
  component: Buttons,
} as Meta;

const Template: Story<ComponentProps<typeof Buttons>> = (args) => {
  const handleStartButton = () => null;
  const greenRoomButtonsArgs = { ...args, handleStartButton };

  return <Buttons {...greenRoomButtonsArgs} />;
};

export const Default = Template.bind({});

export const VoiceOff = Template.bind({});
// VoiceOff.args = {
//   roomState: {
//     isStarted: false,
//     isVoiceOn: false,
//     isScreenOn: true,
//     nickname: 'Guest'
//   }
// };

export const VideoOff = Template.bind({});
// VideoOff.args = {
//   roomState: {
//     isStarted: false,
//     isVoiceOn: true,
//     isScreenOn: false,
//     nickname: 'Guest'
//   }
// };

export const AllOff = Template.bind({});
// AllOff.args = {
//   roomState: {
//     isStarted: false,
//     isVoiceOn: false,
//     isScreenOn: false,
//     nickname: 'Guest'
//   }
// };
