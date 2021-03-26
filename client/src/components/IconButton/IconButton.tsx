import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IconButton.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
  icon: IconProp
  className?: string
  borderClass?: string
  mr?: number
  handleOnclick: () => void
};

const IconButton = ({
  icon,
  className,
  borderClass,
  mr,
  handleOnclick
}: Props) => (
  <button type="button" className={`btn shadow-none rounded-circle ${borderClass} mr-${mr} icon-button ${className}`} onClick={handleOnclick}>
    <FontAwesomeIcon icon={icon} />
  </button>
);

IconButton.defaultProps = {
  className: '',
  mr: 3,
  borderClass: ''
};

export default IconButton;
