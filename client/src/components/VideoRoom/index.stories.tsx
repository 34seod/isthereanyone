import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from '../../store';
import VideoRoom from '.';

export default {
  title: 'VideoRoom',
  component: VideoRoom,
  decorators: [
    (story: () => JSX.Element) => (
      <Provider store={store}>
        <Router>
          <Route path="/:roomId">{story()}</Route>
        </Router>
      </Provider>
    )
  ]
} as Meta;

type VideoRoomStory = Story<ComponentProps<typeof VideoRoom>>;
const Template: VideoRoomStory = (args) => <VideoRoom />;
export const Default = Template.bind({});
