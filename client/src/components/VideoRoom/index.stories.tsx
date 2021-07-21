import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from '../../store';
import {
  changeIsMikeOn,
  changeLock,
  changeIsCameraOn,
  changeIsNewMessage,
  changeIsScreenShare,
  changeShowMessage
} from '../../store/actionCreators';
import * as actionTypes from '../../store/actionTypes';
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

const initilizeMessages = () => ({ type: actionTypes.INITIALIZE_MESSAGE, payload: '' });

type VideoRoomStory = Story<ComponentProps<typeof VideoRoom>>;
const Template: VideoRoomStory = (args) => {
  store.dispatch(initilizeMessages());
  store.dispatch(changeShowMessage(false));
  store.dispatch(changeLock(false));
  store.dispatch(changeIsMikeOn(true));
  store.dispatch(changeIsCameraOn(true));
  store.dispatch(changeIsNewMessage(false));
  store.dispatch(changeIsScreenShare(false));
  return <VideoRoom />;
};
export const Default = Template.bind({});
