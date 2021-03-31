import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IconButton.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
  icon: IconProp
  className?: string
  borderClass?: string
  mr?: number
  notification?: boolean
  handleOnclick: () => void
};

const IconButton = ({
  icon,
  className,
  borderClass,
  mr,
  notification,
  handleOnclick
}: Props) => (
  <button type="button" className={`btn shadow-none rounded-circle position-relative ${borderClass} mr-${mr} icon-button ${className}`} onClick={handleOnclick}>
    {notification ? <div className="new-notification bg-danger rounded-circle" /> : null}
    <FontAwesomeIcon icon={icon} />
  </button>
);

IconButton.defaultProps = {
  className: '',
  mr: 3,
  borderClass: '',
  notification: false,
};

export default IconButton;
