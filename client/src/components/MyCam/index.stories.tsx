import React, { useRef, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import MyCam from '.';

export default {
  title: 'MyCam',
  component: MyCam,
} as Meta;



const Template: Story<React.ComponentProps<typeof MyCam>> = (args) => {
  const videoRef = useRef(document.createElement('video'));
  const [showFlashMessage, setShowFlashMessage] = useState<boolean>(false);
  const myCamArgs = { ...args, videoRef, setShowFlashMessage };

  return <MyCam {...myCamArgs} />;
};

export const Default = Template.bind({});
Default.args = {
  nickname: 'nickname',
  isScreenShare: true,
  roomId: 'test',
};

export const LinkTruncate = Template.bind({});
LinkTruncate.args = {
  nickname: 'nickname',
  isScreenShare: true,
  roomId: 'testtesttesttesttesttesttesttesttesttest',
};

export const NicknameTruncate = Template.bind({});
NicknameTruncate.args = {
  nickname: 'nicknamenicknamenicknamenicknamenickname',
  isScreenShare: true,
  roomId: 'test',
};
