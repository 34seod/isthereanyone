import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import IconButton from '.';

describe('IconButton', () => {
  afterEach(cleanup);

  it('renders IconButton', () => {
    const args = {
      id: 'test-btn',
      icon: faSignInAlt,
      notification: false,
      handleOnclick: () => null,
    };

    const { container } = render(
      <IconButton {...args} />
    );

    expect(container.querySelector(`#${args.id}`)).toBeInTheDocument();
  });

  it('renders IconButton with notification icon', () => {
    const args = {
      id: 'test-btn',
      icon: faSignInAlt,
      notification: true,
      handleOnclick: () => null,
    };

    const { container } = render(
      <IconButton {...args} />
    );

    expect(container.querySelector('.new-notification')).toBeInTheDocument();
  });
});
