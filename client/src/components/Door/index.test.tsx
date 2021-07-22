import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from '../../store';
import Door from '.';

describe('Door', () => {
  afterEach(cleanup);

  it('renders Door', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Route>
            <Door />
          </Route>
        </Router>
      </Provider>
    );

    expect(getByText(/Is there anyone/)).toBeInTheDocument();
  });
});
