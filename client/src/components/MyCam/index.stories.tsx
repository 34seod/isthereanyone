import React, { ComponentProps, useRef } from 'react';
import { Meta, Story } from '@storybook/react';
import MyCam from '.';

export default {
  title: 'MyCam',
  component: MyCam,
} as Meta;

const Template: Story<ComponentProps<typeof MyCam>> = (args) => {
  const videoRef = useRef(document.createElement('video'));
  const myCamArgs = { ...args, videoRef };

  return <MyCam {...myCamArgs} />;
};

export const Default = Template.bind({});
Default.args = {
  roomId: 'test',
};

export const LinkTruncate = Template.bind({});
LinkTruncate.args = {
  roomId: 'testtesttesttesttesttesttesttesttesttest',
};

export const NicknameTruncate = Template.bind({});
NicknameTruncate.args = {
  roomId: 'test',
};
