import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import FlashMessage from '.';

export default {
  title: 'FlashMessage',
  component: FlashMessage,
} as Meta;

type FlashMessageStory = Story<ComponentProps<typeof FlashMessage>>;
const Template: FlashMessageStory = (args) => <FlashMessage {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: 'This message will disappear after "during" second.',
  during: 5000,
};
