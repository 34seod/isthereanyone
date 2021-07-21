import React, { Dispatch, SetStateAction } from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { addMessage, changeShowMessage } from '../../store/actionCreators';
import store from '../../store';
import Chat from '.';

describe('Chat', () => {
  afterEach(cleanup);

  it('renders Chat page', () => {
    store.dispatch(changeShowMessage(true));
    store.dispatch(addMessage({ ownedByCurrentUser: true, body: 'test message1', senderId: 'abcdefg', nickname: 'nickname1', sendedAt: '21/07/12 13:44:10' }));
    store.dispatch(addMessage({ ownedByCurrentUser: false, body: 'test message2', senderId: 'abcdefg', nickname: 'nickname2', sendedAt: '21/07/12 13:44:10' }));
    store.dispatch(addMessage({ ownedByCurrentUser: true, body: 'test message3', senderId: 'abcdefg', nickname: 'nickname1', sendedAt: '21/07/12 13:44:10' }));
    store.dispatch(addMessage({ ownedByCurrentUser: false, body: 'test message4', senderId: 'abcdefg', nickname: 'nickname4', sendedAt: '21/07/12 13:44:10' }));

    const sendMessage = (newMessage: string, nickname: string) => null;
    const args = { sendMessage };

    const { getByText } = render(
      <Provider store={store}>
        <Chat {...args} />
      </Provider>
    );

    const title = getByText(/test message3/);
    expect(title).toBeInTheDocument();
  });
});
