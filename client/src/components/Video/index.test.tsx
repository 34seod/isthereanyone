import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Video from '.';

describe('Video', () => {
  beforeEach(() => {
    window.MediaStream = jest.fn().mockImplementation(() => ({
      addTrack: jest.fn()
    }));
    Object.defineProperty(HTMLMediaElement.prototype, 'muted', {
      set: jest.fn(),
    });
  });
  afterEach(cleanup);

  it('renders Video', () => {
    const args = {
      videoSrc: {
        socketId: 'test',
        nickname: 'test',
        isCameraOn: false,
        isMikeOn: true,
      }
    };

    const { container } = render(
      <Video {...args} />
    );

    expect(container.querySelector('video')).toBeInTheDocument();
  });

  it('show mute icon when mike off', () => {
    const args = {
      videoSrc: {
        socketId: 'test',
        nickname: 'test',
        isCameraOn: false,
        isMikeOn: false,
      }
    };

    const { container } = render(
      <Video {...args} />
    );

    expect(container.querySelector('.fa-microphone-slash')).toBeInTheDocument();
  });
});
