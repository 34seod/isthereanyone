import React, { Dispatch, SetStateAction } from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Chat from '.';

type SetState<T> = Dispatch<SetStateAction<T>>;

describe('Chat', () => {
  afterEach(cleanup);

  it('renders Chat page', () => {
    const setIsNewMessage = ((value: boolean) => null) as SetState<boolean>;
    const setShowMessage = ((value: boolean) => null) as SetState<boolean>;
    const sendMessage = (newMessage: string, nickname: string) => null;
    const args = {
      sendMessage,
      setIsNewMessage,
      setShowMessage,
      showMessage: true,
      nickname: 'nickname',
      messages: [
        { ownedByCurrentUser: true, body: 'test message1', senderId: 'abcdefg', nickname: 'nickname1', sendedAt: '21/07/12 13:44:10' },
        { ownedByCurrentUser: false, body: 'test message2', senderId: 'abcdefg', nickname: 'nickname2', sendedAt: '21/07/12 13:44:10' },
        { ownedByCurrentUser: true, body: 'test message3', senderId: 'abcdefg', nickname: 'nickname1', sendedAt: '21/07/12 13:44:10' },
        { ownedByCurrentUser: false, body: 'test message4', senderId: 'abcdefg', nickname: 'nickname4', sendedAt: '21/07/12 13:44:10' },
      ],
    };

    const { getByText } = render(
      <Chat {...args} />
    );

    const title = getByText(/test message3/);
    expect(title).toBeInTheDocument();
  });
});
