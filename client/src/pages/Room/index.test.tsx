import React from 'react';
import { Router, Route } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import store from '../../store';
import Room from '.';
import { changeIsStarted } from '../../store/actionCreators';

describe('Room', () => {
  afterEach(cleanup);

  it('renders room page', () => {
    const history = createMemoryHistory();
    history.push('/test');

    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/:roomId" component={Room} />
        </Router>
      </Provider>
    );

    const title = getByText(/Who's there\?/);
    expect(title).toBeInTheDocument();
  });

  it('change isMikeOn when click mute button', () => {
    const history = createMemoryHistory();
    history.push('/test');

    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/:roomId" component={Room} />
        </Router>
      </Provider>
    );

    const muteBtn = container.querySelector('#mike-icon-btn') || document.createElement('button');
    fireEvent.click(muteBtn, { button: 0 });

    expect(container.querySelector('.fa-microphone-slash')).toBeInTheDocument();
  });

  it('change isCameraOn when click video button', () => {
    const history = createMemoryHistory();
    history.push('/test');

    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/:roomId" component={Room} />
        </Router>
      </Provider>
    );

    const videoBtn = container.querySelector('#camera-icon-btn') || document.createElement('button');
    fireEvent.click(videoBtn, { button: 0 });

    expect(container.querySelector('.fa-video-slash')).toBeInTheDocument();
  });

  it('change isStarted when click start button', () => {
    window.MediaStream = jest.fn().mockImplementation(() => ({
      addTrack: jest.fn()
    }));
    Object.defineProperty(HTMLMediaElement.prototype, 'muted', {
      set: jest.fn(),
    });

    const history = createMemoryHistory();
    history.push('/test');

    const { container, getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/:roomId" component={Room} />
        </Router>
      </Provider>
    );

    const startBtn = container.querySelector('#start-icon-btn') || document.createElement('button');
    fireEvent.click(startBtn, { button: 0 });

    const title = getByText(/Nobody in here/);
    expect(title).toBeInTheDocument();
  });

  it('go root path when click hangup button', () => {
    const history = createMemoryHistory();
    history.push('/test');

    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/:roomId" component={Room} />
        </Router>
      </Provider>
    );

    store.dispatch(changeIsStarted(false));
    const signOutBtn = container.querySelector('#hangup-icon-btn') || document.createElement('button');
    fireEvent.click(signOutBtn, { button: 0 });

    expect(history.location.pathname).toBe('/');
  });
});
