import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import VideoRoom from '.';

describe('VideoRoom', () => {
  beforeEach(() => {
    window.MediaStream = jest.fn().mockImplementation(() => ({
      addTrack: jest.fn()
    }));
    Object.defineProperty(HTMLMediaElement.prototype, 'muted', {
      set: jest.fn(),
    });
  });
  afterEach(cleanup);

  it('renders VideoRoom', () => {
    const history = createMemoryHistory();
    history.push('/test');

    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/:roomId" component={VideoRoom} />
        </Router>
      </Provider>
    );

    expect(getByText(/Nobody in here/)).toBeInTheDocument();
  });
});
