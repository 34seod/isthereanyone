import React from 'react';
import { Router, Route } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import store from '../../../store';
import Buttons from '.';
import {
  changeLock,
  changeIsCameraOn,
  changeIsMikeOn,
  changeIsNewMessage,
  changeIsScreenShare
} from '../../../store/actionCreators';
import Chat from '../../Chat';

const buttonsArgs = {
  handleLock: jest.fn(),
  handleScreenShare: jest.fn(),
  handleMute: jest.fn(),
  handleScreen: jest.fn(),
  stopCapture: jest.fn(),
};

describe('Buttons', () => {
  beforeEach(() => {
    store.dispatch(changeLock(false));
    store.dispatch(changeIsMikeOn(true));
    store.dispatch(changeIsCameraOn(true));
    store.dispatch(changeIsNewMessage(false));
    store.dispatch(changeIsScreenShare(false));
  });
  afterEach(cleanup);

  it('renders VideoRoom Buttons', () => {
    const { container } = render(
      <Provider store={store}>
        <Buttons {...buttonsArgs} />
      </Provider>
    );

    expect(container.querySelector('.fa-lock-open')).toBeInTheDocument();
    expect(container.querySelector('.fa-microphone')).toBeInTheDocument();
    expect(container.querySelector('.fa-video')).toBeInTheDocument();
    expect(container.querySelector('.fa-comments')).toBeInTheDocument();
    expect(container.querySelector('.fa-sign-out-alt')).toBeInTheDocument();
  });

  it('change lock icon when click lock icon', () => {
    const { container } = render(
      <Provider store={store}>
        <Buttons {...buttonsArgs} />
      </Provider>
    );
    const lock = container.querySelector('#lock-icon-btn') || document.createElement('button');
    fireEvent.click(lock, { button: 0 });

    expect(container.querySelector('.fa-lock')).toBeInTheDocument();
  });

  it('change microphone slash icon when click microphone icon', () => {
    const { container } = render(
      <Provider store={store}>
        <Buttons {...buttonsArgs} />
      </Provider>
    );
    const microphone = container.querySelector('#mike-icon-btn') || document.createElement('button');
    fireEvent.click(microphone, { button: 0 });

    expect(container.querySelector('.fa-microphone-slash')).toBeInTheDocument();
  });

  it('change camera slash icon when click camera icon', () => {
    const { container } = render(
      <Provider store={store}>
        <Buttons {...buttonsArgs} />
      </Provider>
    );
    const camera = container.querySelector('#camera-icon-btn') || document.createElement('button');
    fireEvent.click(camera, { button: 0 });

    expect(container.querySelector('.fa-video-slash')).toBeInTheDocument();
  });

  it('open chat modal when click message icon', () => {
    const chatArgs = { sendMessage: jest.fn() };
    const { container, getByText } = render(
      <Provider store={store}>
        <Chat {...chatArgs} />
        <Buttons {...buttonsArgs} />
      </Provider>
    );
    const message = container.querySelector('#message-icon-btn') || document.createElement('button');
    fireEvent.click(message, { button: 0 });

    expect(getByText(/Messages/)).toBeInTheDocument();
  });

  it('go to root path when click hangup', () => {
    const history = createMemoryHistory();

    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <Route>
            <Buttons {...buttonsArgs} />
          </Route>
        </Router>
      </Provider>
    );
    const signOut = container.querySelector('#hangup-icon-btn') || document.createElement('button');
    fireEvent.click(signOut, { button: 0 });

    expect(history.location.pathname).toBe('/');
  });
});
