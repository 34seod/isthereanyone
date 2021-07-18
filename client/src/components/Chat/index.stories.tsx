import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import Chat from '.';

export default {
  title: 'Chat',
  component: Chat,
} as Meta;

const Template: Story<ComponentProps<typeof Chat>> = (args) => {
  const sendMessage = (newMessage: string, nickname: string) => null;
  const chatArgs = { ...args, sendMessage };

  return <Chat {...chatArgs} />;
};

export const Default = Template.bind({});
Default.args = {
  messages: [
    { ownedByCurrentUser: true, body: 'test message1', senderId: 'abcdefg', nickname: 'nickname1', sendedAt: '21/07/12 13:44:10' },
    { ownedByCurrentUser: false, body: 'test message2', senderId: 'abcdefg', nickname: 'nickname2', sendedAt: '21/07/12 13:44:10' },
    { ownedByCurrentUser: true, body: 'test message3', senderId: 'abcdefg', nickname: 'nickname1', sendedAt: '21/07/12 13:44:10' },
    { ownedByCurrentUser: false, body: 'test message4', senderId: 'abcdefg', nickname: 'nickname4', sendedAt: '21/07/12 13:44:10' },
  ],
};

export const DisplayNone = Template.bind({});
DisplayNone.args = {
  messages: [
    { ownedByCurrentUser: true, body: 'test message1', senderId: 'abcdefg', nickname: 'nickname1', sendedAt: '21/07/12 13:44:10' },
    { ownedByCurrentUser: false, body: 'test message2', senderId: 'abcdefg', nickname: 'nickname2', sendedAt: '21/07/12 13:44:10' },
    { ownedByCurrentUser: false, body: 'test message3', senderId: 'abcdefg', nickname: 'nickname3', sendedAt: '21/07/12 13:44:10' },
    { ownedByCurrentUser: false, body: 'test message4', senderId: 'abcdefg', nickname: 'nickname4', sendedAt: '21/07/12 13:44:10' },
  ],
};

export const Truncate = Template.bind({});
Truncate.args = {
  messages: [
    { ownedByCurrentUser: true, body: 'test message1aaaaaaaaaaaaaaaaaaa', senderId: 'abcdefg', nickname: 'nickname1aaaaaaaaaaaaaaaa', sendedAt: '21/07/12 13:44:10' },
    { ownedByCurrentUser: false, body: 'test message2', senderId: 'abcdefg', nickname: 'nickname2aaaaaaaaaaaaaaaa', sendedAt: '21/07/12 13:44:10' },
    { ownedByCurrentUser: false, body: 'test message3', senderId: 'abcdefg', nickname: 'nickname3aaaaaaaaaaaaaaaa', sendedAt: '21/07/12 13:44:10' },
    { ownedByCurrentUser: false, body: 'test message4', senderId: 'abcdefg', nickname: 'nickname4aaaaaaaaaaaaaaaa', sendedAt: '21/07/12 13:44:10' },
  ],
};

export const LinkMessage = Template.bind({});
LinkMessage.args = {
  messages: [
    { ownedByCurrentUser: true, body: 'test message1aaaaaaaaaaaaaaaaaaa', senderId: 'abcdefg', nickname: 'nickname1', sendedAt: '21/07/12 13:44:10' },
    { ownedByCurrentUser: false, body: 'https://isthereany.one/asdf', senderId: 'abcdefg', nickname: 'nickname2', sendedAt: '21/07/12 13:44:10' },
    { ownedByCurrentUser: true, body: 'asdfasdfhttps://isthereany.one/asdf', senderId: 'abcdefg', nickname: 'nickname1', sendedAt: '21/07/12 13:44:10' },
  ],
};
