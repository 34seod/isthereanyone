import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import GreenRoom from '.';

export default {
  title: 'GreenRoom',
  component: GreenRoom,
} as Meta;

type GreenRoomStory = Story<ComponentProps<typeof GreenRoom>>;
const Template: GreenRoomStory = (args) => <GreenRoom {...args} />;

export const Default = Template.bind({});
