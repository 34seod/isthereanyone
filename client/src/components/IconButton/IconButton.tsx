import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IconButton.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
  icon: IconProp
  className?: string
  handleOnclick: () => void
};

const IconButton = ({ icon, className, handleOnclick }: Props) => (
  <button type="button" className={`btn rounded-circle border-secondary mr-3 icon-button ${className}`} onClick={handleOnclick}>
    <FontAwesomeIcon icon={icon} className="icon-size" />
  </button>
);

IconButton.defaultProps = {
  className: ''
};

export default IconButton;
