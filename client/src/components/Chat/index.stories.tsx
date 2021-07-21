import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import { Provider } from 'react-redux';
import Chat from '.';
import { addMessage, changeShowMessage } from '../../store/actionCreators';
import * as actionTypes from '../../store/actionTypes';
import store from '../../store';
import { formatDate } from '../../sharedFunctions';

export default {
  title: 'Chat',
  component: Chat,
  decorators: [
    (story: () => JSX.Element) => <Provider store={store}>{story()}</Provider>
  ]
} as Meta;

const initilizeMessages = () => ({ type: actionTypes.INITIALIZE_MESSAGE, payload: '' });

const sendMessage = (newMessage: string, nickname: string) =>
  store.dispatch(addMessage({ ownedByCurrentUser: true, body: newMessage, senderId: 'abcdefg', nickname, sendedAt: formatDate(new Date()) }));

const Template: Story<ComponentProps<typeof Chat>> = (args) => {
  store.dispatch(changeShowMessage(true));
  store.dispatch(initilizeMessages());
  store.dispatch(addMessage({ ownedByCurrentUser: true, body: 'test message1', senderId: 'abcdefg', nickname: 'nickname1', sendedAt: '21/07/12 13:44:10' }));
  store.dispatch(addMessage({ ownedByCurrentUser: false, body: 'test message2', senderId: 'abcdefg', nickname: 'nickname2', sendedAt: '21/07/12 13:44:10' }));
  store.dispatch(addMessage({ ownedByCurrentUser: true, body: 'test message3', senderId: 'abcdefg', nickname: 'nickname1', sendedAt: '21/07/12 13:44:10' }));
  store.dispatch(addMessage({ ownedByCurrentUser: false, body: 'test message4', senderId: 'abcdefg', nickname: 'nickname4', sendedAt: '21/07/12 13:44:10' }));
  return <Chat {...args} />;
};

const TemplateDisplayNone: Story<ComponentProps<typeof Chat>> = (args) => {
  store.dispatch(changeShowMessage(false));
  store.dispatch(initilizeMessages());
  return <Chat {...args} />;
};

const TemplateTruncate: Story<ComponentProps<typeof Chat>> = (args) => {
  store.dispatch(changeShowMessage(true));
  store.dispatch(initilizeMessages());
  store.dispatch(addMessage({ ownedByCurrentUser: true, body: 'test message1aaaaaaaaaaaaaaaaaaa', senderId: 'abcdefg', nickname: 'nickname1aaaaaaaaaaaaaaaa', sendedAt: '21/07/12 13:44:10' }));
  store.dispatch(addMessage({ ownedByCurrentUser: false, body: 'test message2', senderId: 'abcdefg', nickname: 'nickname2aaaaaaaaaaaaaaaa', sendedAt: '21/07/12 13:44:10' }));
  store.dispatch(addMessage({ ownedByCurrentUser: false, body: 'test message3', senderId: 'abcdefg', nickname: 'nickname3aaaaaaaaaaaaaaaa', sendedAt: '21/07/12 13:44:10' }));
  store.dispatch(addMessage({ ownedByCurrentUser: false, body: 'test message4', senderId: 'abcdefg', nickname: 'nickname4aaaaaaaaaaaaaaaa', sendedAt: '21/07/12 13:44:10' }));
  return <Chat {...args} />;
};

const TemplateLinkMessage: Story<ComponentProps<typeof Chat>> = (args) => {
  store.dispatch(changeShowMessage(true));
  store.dispatch(initilizeMessages());
  store.dispatch(addMessage({ ownedByCurrentUser: true, body: 'test message1', senderId: 'abcdefg', nickname: 'nickname1', sendedAt: '21/07/12 13:44:10' }));
  store.dispatch(addMessage({ ownedByCurrentUser: false, body: 'https://isthereany.one/asdf', senderId: 'abcdefg', nickname: 'nickname2', sendedAt: '21/07/12 13:44:10' }));
  store.dispatch(addMessage({ ownedByCurrentUser: true, body: 'asdfasdfhttps://isthereany.one/asdf', senderId: 'abcdefg', nickname: 'nickname1', sendedAt: '21/07/12 13:44:10' }));
  return <Chat {...args} />;
};

export const Default = Template.bind({});
Default.args = { sendMessage };

export const DisplayNone = TemplateDisplayNone.bind({});
DisplayNone.args = { sendMessage };

export const Truncate = TemplateTruncate.bind({});
Truncate.args = { sendMessage };

export const LinkMessage = TemplateLinkMessage.bind({});
LinkMessage.args = { sendMessage };
