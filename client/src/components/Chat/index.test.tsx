import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { addMessage, changeShowMessage } from '../../store/actionCreators';
import store from '../../store';
import Chat from '.';
import * as actionTypes from '../../store/actionTypes';
import { formatDate } from '../../sharedFunctions';

const initilizeMessages = () => ({ type: actionTypes.INITIALIZE_MESSAGE, payload: '' });
const sendMessage = (newMessage: string, nickname: string) =>
  store.dispatch(addMessage({ ownedByCurrentUser: true, body: newMessage, senderId: 'abcdefg', nickname, sendedAt: formatDate(new Date()) }));
const args = { sendMessage };

describe('Chat', () => {
  beforeEach(() => {
    store.dispatch(changeShowMessage(true));
    store.dispatch(initilizeMessages());
  });

  afterEach(cleanup);

  it('renders Chat', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Chat {...args} />
      </Provider>
    );

    expect(getByText(/Messages/)).toBeInTheDocument();
  });

  it('send new message when press button', () => {
    const { container, getByText } = render(
      <Provider store={store}>
        <Chat {...args} />
      </Provider>
    );
    const input = container.querySelector('#new-message') || document.createElement('input');
    const sendBtn = container.querySelector('#message-send-btn') || document.createElement('button');
    fireEvent.change(input, { target: { value: 'testMsg' } });
    fireEvent.click(sendBtn, { button: 0 });

    expect(getByText(/testMsg/)).toBeInTheDocument();
  });

  it('send new message when press enter key', () => {
    const { container, getByText } = render(
      <Provider store={store}>
        <Chat {...args} />
      </Provider>
    );
    const input = container.querySelector('#new-message') || document.createElement('input');
    fireEvent.change(input, { target: { value: 'testMsg' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

    expect(getByText(/testMsg/)).toBeInTheDocument();
  });

  it('change link message to anchor tag', () => {
    const { container } = render(
      <Provider store={store}>
        <Chat {...args} />
      </Provider>
    );
    const input = container.querySelector('#new-message') || document.createElement('input');
    fireEvent.change(input, { target: { value: 'https://www.google.com' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

    expect(container.querySelector('a')).toBeInTheDocument();
  });

  it('will close when press close button', () => {
    const { container } = render(
      <Provider store={store}>
        <Chat {...args} />
      </Provider>
    );
    const close = container.querySelector('.close') || document.createElement('button');
    fireEvent.click(close, { button: 0 });

    expect(container.querySelector('.d-none')).toBeInTheDocument();
  });
});
