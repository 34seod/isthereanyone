import React from 'react';
import {
  Router,
  Route,
} from 'react-router-dom';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Room from '.';


describe('Room', () => {
  afterEach(cleanup);

  it('renders room page', () => {
    const history = createMemoryHistory();
    history.push('/test');

    const { getByText } = render(
      <Router history={history}>
        <Route path="/:roomId" component={Room} />
      </Router>
    );

    const title = getByText(/Who's there\?/);
    expect(title).toBeInTheDocument();
  });

  it('change isVoiceOn when click mute button', () => {
    const history = createMemoryHistory();
    history.push('/test');

    const { container } = render(
      <Router history={history}>
        <Route path="/:roomId" component={Room} />
      </Router>
    );

    const muteBtn = container.querySelector('.fa-microphone')?.parentElement || document.createElement('button');
    fireEvent.click(muteBtn, { button: 0 });

    expect(container.querySelector('.fa-microphone-slash')).toBeInTheDocument();
  });

  it('change isScreenOn when click video button', () => {
    const history = createMemoryHistory();
    history.push('/test');

    const { container } = render(
      <Router history={history}>
        <Route path="/:roomId" component={Room} />
      </Router>
    );

    const videoBtn = container.querySelector('.fa-video')?.parentElement || document.createElement('button');
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
      <Router history={history}>
        <Route path="/:roomId" component={Room} />
      </Router>
    );

    const startBtn = container.querySelector('.fa-sign-in-alt')?.parentElement || document.createElement('button');
    fireEvent.click(startBtn, { button: 0 });

    const title = getByText(/Nobody in here/);
    expect(title).toBeInTheDocument();
  });

  it('go root path when click leave button', () => {
    const history = createMemoryHistory();
    history.push('/test');

    const { container } = render(
      <Router history={history}>
        <Route path="/:roomId" component={Room} />
      </Router>
    );

    const signOutBtn = container.querySelector('.fa-sign-out-alt')?.parentElement || document.createElement('button');
    fireEvent.click(signOutBtn, { button: 0 });

    expect(history.location.pathname).toBe('/');
  });
});
