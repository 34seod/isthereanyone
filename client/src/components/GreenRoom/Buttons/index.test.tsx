import React from 'react';
import { Router, Route } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import store from '../../../store';
import Buttons from '.';
import { changeIsCameraOn, changeIsMikeOn } from '../../../store/actionCreators';

const buttonsArgs = {
  handleStartButton: jest.fn(),
};

describe('Buttons', () => {
  beforeEach(() => {
    store.dispatch(changeIsCameraOn(true));
    store.dispatch(changeIsMikeOn(true));
  });
  afterEach(cleanup);

  it('renders GreenRoom Buttons', () => {
    const { container } = render(
      <Provider store={store}>
        <Buttons {...buttonsArgs} />
      </Provider>
    );

    expect(container.querySelector('.fa-microphone')).toBeInTheDocument();
    expect(container.querySelector('.fa-video')).toBeInTheDocument();
    expect(container.querySelector('.fa-sign-in-alt')).toBeInTheDocument();
    expect(container.querySelector('.fa-sign-out-alt')).toBeInTheDocument();
  });

  it('change microphone slash icon when click microphone', () => {
    const { container } = render(
      <Provider store={store}>
        <Buttons {...buttonsArgs} />
      </Provider>
    );
    const microphone = container.querySelector('#mike-icon-btn') || document.createElement('button');
    fireEvent.click(microphone, { button: 0 });

    expect(container.querySelector('.fa-microphone-slash')).toBeInTheDocument();
  });

  it('change camera slash icon when click camera', () => {
    const { container } = render(
      <Provider store={store}>
        <Buttons {...buttonsArgs} />
      </Provider>
    );
    const microphone = container.querySelector('#camera-icon-btn') || document.createElement('button');
    fireEvent.click(microphone, { button: 0 });

    expect(container.querySelector('.fa-video-slash')).toBeInTheDocument();
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
    const microphone = container.querySelector('#hangup-icon-btn') || document.createElement('button');
    fireEvent.click(microphone, { button: 0 });

    expect(history.location.pathname).toBe('/');
  });
});
