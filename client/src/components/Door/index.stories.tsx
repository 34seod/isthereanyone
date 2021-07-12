import React, { useRef, useState, KeyboardEvent, ChangeEvent } from 'react';
import { Meta, Story } from '@storybook/react';
import Door from '.';

export default {
  title: 'Door',
  component: Door,
} as Meta;

const Template: Story<React.ComponentProps<typeof Door>> = (args) => {
  const inputRef = useRef(document.createElement('input'));
  const [, setShowFlashMessage] = useState<boolean>(false);
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => null;
  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => null;
  const doorArgs = {
    ...args,
    inputRef,
    setShowFlashMessage,
    handleKeyPress,
    handleRoomNameChange
  };

  return <div className="new fix"><Door {...doorArgs} /></div>;
};

export const Default = Template.bind({});
Default.args = {
  roomName: 'Room',
  showFlashMessage: false
};
