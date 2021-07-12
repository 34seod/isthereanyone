import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import FlashMessage from '.';

export default {
  title: 'FlashMessage',
  component: FlashMessage,
} as Meta;

const Template: Story<React.ComponentProps<typeof FlashMessage>> = (args) => {
  const [not, unmount] = useState<boolean>(false);
  const flashMessageArgs = { ...args, unmount };

  return <FlashMessage {...flashMessageArgs} />;
};

export const Default = Template.bind({});
Default.args = {
  message: 'This message will disappear after "during" second.',
  during: 5000,
};
