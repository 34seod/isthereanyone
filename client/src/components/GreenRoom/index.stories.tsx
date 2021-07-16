import React, { ComponentProps, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import GreenRoom from '.';

export default {
  title: 'GreenRoom',
  component: GreenRoom,
} as Meta;

const Template: Story<ComponentProps<typeof GreenRoom>> = (args) => {
  const [, setRoomState] = useState<RoomState>(args.roomState);
  const greenRoomArgs = { ...args, setRoomState };

  return <GreenRoom {...greenRoomArgs} />;
};

export const Default = Template.bind({});
Default.args = {
  roomState: {
    isStarted: false,
    isVoiceOn: true,
    isScreenOn: true,
    nickname: 'Guest'
  }
};
