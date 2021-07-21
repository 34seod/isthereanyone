import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import { Provider } from 'react-redux';
import store from '../../../store';
import Buttons from '.';
import {
  changeIsMikeOn,
  changeLock,
  changeIsCameraOn,
  changeIsNewMessage,
  changeIsScreenShare
} from '../../../store/actionCreators';

export default {
  title: 'VideoRoomButtons',
  component: Buttons,
  decorators: [
    (story: () => JSX.Element) => <Provider store={store}>{story()}</Provider>
  ]
} as Meta;

const commonArgs = {
  handleLock: () => null,
  stopCapture: () => null,
  handleScreenShare: () => null,
  handleMute: (isMikeOn: boolean) => null,
  handleScreen: (isCameraOn: boolean) => null,
};

const Template: Story<ComponentProps<typeof Buttons>> = (args) => {
  store.dispatch(changeLock(false));
  store.dispatch(changeIsMikeOn(true));
  store.dispatch(changeIsCameraOn(true));
  store.dispatch(changeIsNewMessage(false));
  store.dispatch(changeIsScreenShare(false));
  return <Buttons {...commonArgs} />;
};

const TemplateNewMessage: Story<ComponentProps<typeof Buttons>> = (args) => {
  store.dispatch(changeLock(false));
  store.dispatch(changeIsMikeOn(true));
  store.dispatch(changeIsCameraOn(true));
  store.dispatch(changeIsNewMessage(true));
  store.dispatch(changeIsScreenShare(false));
  return <Buttons {...commonArgs} />;
};

const TemplateMikeOff: Story<ComponentProps<typeof Buttons>> = (args) => {
  store.dispatch(changeLock(false));
  store.dispatch(changeIsMikeOn(false));
  store.dispatch(changeIsCameraOn(true));
  store.dispatch(changeIsNewMessage(false));
  store.dispatch(changeIsScreenShare(false));
  return <Buttons {...commonArgs} />;
};

const TemplateCameraOff: Story<ComponentProps<typeof Buttons>> = (args) => {
  store.dispatch(changeLock(false));
  store.dispatch(changeIsMikeOn(true));
  store.dispatch(changeIsCameraOn(false));
  store.dispatch(changeIsNewMessage(false));
  store.dispatch(changeIsScreenShare(false));
  return <Buttons {...commonArgs} />;
};

const TemplateLock: Story<ComponentProps<typeof Buttons>> = (args) => {
  store.dispatch(changeLock(true));
  store.dispatch(changeIsMikeOn(true));
  store.dispatch(changeIsCameraOn(true));
  store.dispatch(changeIsNewMessage(false));
  store.dispatch(changeIsScreenShare(false));
  return <Buttons {...commonArgs} />;
};

const TemplateScreenShare: Story<ComponentProps<typeof Buttons>> = (args) => {
  store.dispatch(changeLock(false));
  store.dispatch(changeIsMikeOn(true));
  store.dispatch(changeIsCameraOn(true));
  store.dispatch(changeIsNewMessage(false));
  store.dispatch(changeIsScreenShare(true));
  return <Buttons {...commonArgs} />;
};

const TemplateAllOff: Story<ComponentProps<typeof Buttons>> = (args) => {
  store.dispatch(changeLock(true));
  store.dispatch(changeIsMikeOn(false));
  store.dispatch(changeIsCameraOn(false));
  store.dispatch(changeIsNewMessage(false));
  store.dispatch(changeIsScreenShare(false));
  return <Buttons {...commonArgs} />;
};

export const Default = Template.bind({});
export const NewMessage = TemplateNewMessage.bind({});
export const MikeOff = TemplateMikeOff.bind({});
export const CameraOff = TemplateCameraOff.bind({});
export const ScreenShare = TemplateScreenShare.bind({});
export const Locked = TemplateLock.bind({});
export const AllOff = TemplateAllOff.bind({});
