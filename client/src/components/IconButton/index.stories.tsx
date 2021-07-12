import React, { useRef, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import IconButton from '.';

export default {
  title: 'IconButton',
  component: IconButton,
};

const Template: Story<React.ComponentProps<typeof IconButton>> = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: faMicrophone,
  className: 'bg-success text-white',
  mr: 3,
  notification: false,
  handleOnclick: () => null
};

export const Notification = Template.bind({});
Notification.args = {
  icon: faMicrophone,
  className: 'bg-success text-white',
  notification: true,
  mr: 0,
  handleOnclick: () => null
};
