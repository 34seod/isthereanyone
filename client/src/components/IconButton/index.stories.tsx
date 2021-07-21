import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'react-redux';
import store from '../../store';
import IconButton from '.';

export default {
  title: 'IconButton',
  component: IconButton,
  decorators: [
    (story: () => JSX.Element) => <Provider store={store}>{story()}</Provider>
  ]
} as Meta;

type IconButtonStory = Story<ComponentProps<typeof IconButton>>;
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
