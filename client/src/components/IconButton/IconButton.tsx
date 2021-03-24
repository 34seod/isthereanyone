import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IconButton.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
  icon: IconProp
  handleOnclick: () => void
};

const IconButton = ({ icon, handleOnclick }: Props) => (
  <button type="button" className="rounded-circle border-dark mr-1 icon-button" onClick={handleOnclick}>
    <FontAwesomeIcon icon={icon} />
  </button>
);

export default IconButton;
