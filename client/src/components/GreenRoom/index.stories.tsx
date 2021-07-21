import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import { Provider } from 'react-redux';
import store from '../../store';
import GreenRoom from '.';

export default {
  title: 'GreenRoom',
  component: GreenRoom,
  decorators: [
    (story: () => JSX.Element) => <Provider store={store}>{story()}</Provider>
  ]
} as Meta;

type GreenRoomStory = Story<ComponentProps<typeof GreenRoom>>;
const Template: GreenRoomStory = (args) => <GreenRoom {...args} />;

export const Default = Template.bind({});
