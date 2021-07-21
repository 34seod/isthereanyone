import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import { Provider } from 'react-redux';
import store from '../../store';
import FlashMessage from '.';
import { showFlashMessage } from '../../store/actionCreators';

export default {
  title: 'FlashMessage',
  component: FlashMessage,
  decorators: [
    (story: () => JSX.Element) => <Provider store={store}>{story()}</Provider>
  ]
} as Meta;

type FlashMessageStory = Story<ComponentProps<typeof FlashMessage>>;
const Template: FlashMessageStory = (args) => {
  store.dispatch(showFlashMessage(true));
  return <FlashMessage {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  message: 'This message will disappear after "during" second.',
  during: 5000,
};
