import React, { RefObject } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import MyCam from '.';
import FlashMessage from '../FlashMessage';

const videoRef: RefObject<HTMLVideoElement> = {
  current: document.createElement('video')
};
const flashMessageArgs = {
  message: 'URL has been copied. Share with others.',
  during: 3000,
};
const myCamArgs = {
  videoRef,
  roomId: 'test',
};

describe('MyCam', () => {
  beforeEach(() => {
    window.MediaStream = jest.fn().mockImplementation(() => ({
      addTrack: jest.fn()
    }));
    Object.defineProperty(HTMLMediaElement.prototype, 'muted', {
      set: jest.fn(),
    });
  });
  afterEach(cleanup);

  it('renders MyCam', () => {
    const { container } = render(
      <Provider store={store}>
        <MyCam {...myCamArgs} />
      </Provider>
    );

    expect(container.querySelector('video')).toBeInTheDocument();
  });

  it('click link button. show up flash message', () => {
    const { container, getByText } = render(
      <Provider store={store}>
        <FlashMessage {...flashMessageArgs} />
        <MyCam {...myCamArgs} />
      </Provider>
    );

    window.document.execCommand = jest.fn();
    const link = container.querySelector('.room-title-btn') || document.createElement('button');
    fireEvent.click(link, { button: 0 });

    expect(getByText(/URL has been copied/)).toBeInTheDocument();
  });
});
