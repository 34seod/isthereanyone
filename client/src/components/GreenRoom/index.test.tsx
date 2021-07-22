import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import GreenRoom from '.';

describe('GreenRoom', () => {
  afterEach(cleanup);

  it('renders GreenRoom', () => {
    const { getByText } = render(
      <Provider store={store}>
        <GreenRoom />
      </Provider>
    );

    expect(getByText(/Who's there\?/)).toBeInTheDocument();
  });
});
