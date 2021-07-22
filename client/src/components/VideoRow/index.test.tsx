import React from 'react';
import { render, cleanup } from '@testing-library/react';
import VideoRow from '.';

describe('VideoRow', () => {
  beforeEach(() => {
    window.MediaStream = jest.fn().mockImplementation(() => ({
      addTrack: jest.fn()
    }));
    Object.defineProperty(HTMLMediaElement.prototype, 'muted', {
      set: jest.fn(),
    });
  });
  afterEach(cleanup);

  it('renders VideoRow', () => {
    const args = {
      videoSrces: [{
        socketId: 'test',
        nickname: 'test',
        isCameraOn: false,
        isMikeOn: true,
      }]
    };

    const { container } = render(
      <VideoRow {...args} />
    );

    expect(container.querySelector('video')).toBeInTheDocument();
    expect(container.querySelector('.row-cols-1')).toBeInTheDocument();
  });

  it('renders 2 video tag in row when videoScres.length is 1 ~ 4', () => {
    const args = {
      videoSrces: [
        { socketId: 'test1', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test2', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test3', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test4', nickname: 'test', isCameraOn: false, isMikeOn: true },
      ]
    };

    const { container } = render(
      <VideoRow {...args} />
    );

    expect(container.querySelector('.row-cols-2')).toBeInTheDocument();
  });

  it('renders 3 video tag in row when videoScres.length is 5 ~ 9', () => {
    const args = {
      videoSrces: [
        { socketId: 'test1', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test2', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test3', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test4', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test5', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test6', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test7', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test8', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test9', nickname: 'test', isCameraOn: false, isMikeOn: true },
      ]
    };

    const { container } = render(
      <VideoRow {...args} />
    );

    expect(container.querySelector('.row-cols-3')).toBeInTheDocument();
  });

  it('renders 4 video tag in row when videoScres.length is 10 ~ 16', () => {
    const args = {
      videoSrces: [
        { socketId: 'test1', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test2', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test3', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test4', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test5', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test6', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test7', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test8', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test9', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test10', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test11', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test12', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test13', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test14', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test15', nickname: 'test', isCameraOn: false, isMikeOn: true },
        { socketId: 'test16', nickname: 'test', isCameraOn: false, isMikeOn: true },
      ]
    };

    const { container } = render(
      <VideoRow {...args} />
    );

    expect(container.querySelector('.row-cols-4')).toBeInTheDocument();
  });
});
