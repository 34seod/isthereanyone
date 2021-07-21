import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import { Provider } from 'react-redux';
import store from '../../../store';
import {
  changeIsCameraOn, changeIsMikeOn
} from '../../../store/actionCreators';
import Buttons from '.';

export default {
  title: 'GreenRoomButtons',
  component: Buttons,
  decorators: [
    (story: () => JSX.Element) => <Provider store={store}>{story()}</Provider>
  ]
} as Meta;

const commonArgs = { handleStartButton: () => null };

const Template: Story<ComponentProps<typeof Buttons>> = (args) => {
  store.dispatch(changeIsMikeOn(true));
  store.dispatch(changeIsCameraOn(true));
  return <Buttons {...commonArgs} />;
};

const TemplateMikeOff: Story<ComponentProps<typeof Buttons>> = (args) => {
  store.dispatch(changeIsMikeOn(false));
  store.dispatch(changeIsCameraOn(true));
  return <Buttons {...commonArgs} />;
};

const TemplateCameraOff: Story<ComponentProps<typeof Buttons>> = (args) => {
  store.dispatch(changeIsMikeOn(true));
  store.dispatch(changeIsCameraOn(false));
  return <Buttons {...commonArgs} />;
};

const TemplateAllOff: Story<ComponentProps<typeof Buttons>> = (args) => {
  store.dispatch(changeIsMikeOn(false));
  store.dispatch(changeIsCameraOn(false));
  return <Buttons {...commonArgs} />;
};

export const Default = Template.bind({});
export const MikeOff = TemplateMikeOff.bind({});
export const CameraOff = TemplateCameraOff.bind({});
export const AllOff = TemplateAllOff.bind({});
