import React, { ComponentProps, useRef } from 'react';
import { Meta, Story } from '@storybook/react';
import { Provider } from 'react-redux';
import store from '../../store';
import MyCam from '.';
import FlashMessage from '../FlashMessage';
import { changeNickname } from '../../store/actionCreators';

export default {
  title: 'MyCam',
  component: MyCam,
  decorators: [
    (story: () => JSX.Element) => <Provider store={store}>{story()}</Provider>
  ]
} as Meta;

const flashMessageArgs = {
  message: 'URL has been copied. Share with others.',
  during: 3000,
};

type MyCamStory = Story<ComponentProps<typeof MyCam>>;
const Template: MyCamStory = (args) => {
  const videoRef = useRef(document.createElement('video'));
  const myCamArgs = { ...args, videoRef };
  store.dispatch(changeNickname('Guest'));
  return <><FlashMessage {...flashMessageArgs} /><MyCam {...myCamArgs} /></>;
};

const TemplateTruncateNickname: MyCamStory = (args) => {
  const videoRef = useRef(document.createElement('video'));
  const myCamArgs = { ...args, videoRef };
  store.dispatch(changeNickname('testtesttesttesttesttesttesttesttesttest'));
  return <><FlashMessage {...flashMessageArgs} /><MyCam {...myCamArgs} /></>;
};

export const Default = Template.bind({});
Default.args = {
  roomId: 'test',
};

export const LinkTruncate = Template.bind({});
LinkTruncate.args = {
  roomId: 'testtesttesttesttesttesttesttesttesttest',
};

export const NicknameTruncate = TemplateTruncateNickname.bind({});
NicknameTruncate.args = {
  roomId: 'test',
};
