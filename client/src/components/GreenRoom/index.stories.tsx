import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import { Provider } from 'react-redux';
import store from '../../store';
import GreenRoom from '.';
import {
  changeIsCameraOn, changeIsMikeOn
} from '../../store/actionCreators';

export default {
  title: 'GreenRoom',
  component: GreenRoom,
  decorators: [
    (story: () => JSX.Element) => <Provider store={store}>{story()}</Provider>
  ]
} as Meta;

type GreenRoomStory = Story<ComponentProps<typeof GreenRoom>>;
const Template: GreenRoomStory = (args) => {
  store.dispatch(changeIsMikeOn(true));
  store.dispatch(changeIsCameraOn(true));
  return <GreenRoom {...args} />;
};

export const Default = Template.bind({});
