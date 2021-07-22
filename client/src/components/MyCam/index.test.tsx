import React, { RefObject } from 'react';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import MyCam from '.';

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
    const videoRef: RefObject<HTMLVideoElement> = {
      current: document.createElement('video')
    };
    const args = {
      videoRef,
      roomId: 'test',
    };

    const { container } = render(
      <Provider store={store}>
        <MyCam {...args} />
      </Provider>
    );

    expect(container.querySelector('video')).toBeInTheDocument();
  });
});
