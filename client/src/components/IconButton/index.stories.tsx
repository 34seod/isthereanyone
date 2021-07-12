import React from 'react';
import { Meta, Story } from '@storybook/react';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import IconButton from '.';

export default {
  title: 'IconButton',
  component: IconButton,
} as Meta;

type IconButtonStory = Story<React.ComponentProps<typeof IconButton>>;
const Template: IconButtonStory = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: faComments,
  className: 'bg-warning text-white',
  mr: 3,
  notification: false,
  handleOnclick: () => null
};

export const Notification = Template.bind({});
Notification.args = {
  icon: faComments,
  className: 'bg-warning text-white',
  notification: true,
  mr: 0,
  handleOnclick: () => null
};
