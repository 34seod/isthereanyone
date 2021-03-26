import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IconButton.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
  icon: IconProp
  className?: string
  borderClass?: string
  handleOnclick: () => void
};

const IconButton = ({ icon, className, borderClass, handleOnclick }: Props) => (
  <button type="button" className={`btn shadow-none rounded-circle ${borderClass} mr-3 icon-button ${className}`} onClick={handleOnclick}>
    <FontAwesomeIcon icon={icon} />
  </button>
);

IconButton.defaultProps = {
  className: '',
  borderClass: 'border-secondary'
};

export default IconButton;
