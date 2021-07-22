import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import FlashMessage from '.';
import { showFlashMessage } from '../../store/actionCreators';

describe('FlashMessage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    store.dispatch(showFlashMessage(true));
  });

  afterEach(() => {
    jest.clearAllTimers();
    cleanup();
  });

  it('renders FlashMessage and will disappear after 3s', () => {
    const args = { message: 'test flash message' };

    const { container, getByText } = render(
      <Provider store={store}>
        <FlashMessage {...args} />
      </Provider>
    );

    expect(getByText(/test flash message/)).toBeInTheDocument();
    expect(container.querySelector('.flash-message')).toBeInTheDocument();

    jest.runAllTimers();

    expect(container.querySelector('.flash-message')).not.toBeInTheDocument();
  });
});
