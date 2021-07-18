import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
  icon: IconProp
  className?: string
  mr?: number
  notification?: boolean
  handleOnclick: () => void
};

const IconButton: React.FC<Props> = ({
  icon,
  className,
  mr,
  notification,
  handleOnclick
}: Props) => (
  <button type="button" className={`btn shadow-none rounded-circle position-relative mr-${mr} icon-button ${className}`} onClick={handleOnclick}>
    {notification ? <div className="new-notification bg-danger rounded-circle" /> : null}
    <FontAwesomeIcon icon={icon} />
  </button>
);

IconButton.defaultProps = {
  className: '',
  mr: 3,
  notification: false,
};

export default IconButton;
