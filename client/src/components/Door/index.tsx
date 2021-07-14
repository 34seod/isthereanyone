import React, { KeyboardEvent, RefObject, ChangeEvent, Dispatch } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import FlashMessage from '../FlashMessage';
import './index.css';

type Props = {
  showFlashMessage: boolean
  inputRef: RefObject<HTMLInputElement>
  roomName: string
  setShowFlashMessage: Dispatch<React.SetStateAction<boolean>>
  handleKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void
  handleOnClick: () => void
  handleRoomNameChange: (event: ChangeEvent<HTMLInputElement>) => void
};

const Door = ({
  showFlashMessage,
  inputRef,
  roomName,
  setShowFlashMessage,
  handleKeyPress,
  handleOnClick,
  handleRoomNameChange
}: Props) => (
  <>
    <FontAwesomeIcon icon={faDoorClosed} className="background-icon" />
    {showFlashMessage ? <FlashMessage message="The room is locked." during={3000} unmount={setShowFlashMessage} /> : null}
    <div className="d-flex h-100 w-100">
      <div className="m-auto title-wrapper text-center rounded">
        <p className="title text-center mb-0">Is there anyone</p>
        <div className="group_title">
          <span className="title">in</span>
          <span className="title_tf">
            <input
              ref={inputRef}
              type="text"
              placeholder="Room"
              value={roomName}
              onChange={handleRoomNameChange}
              className="tf text-input-field border border-dark rounded"
              onKeyPress={handleKeyPress}
            />
          </span>
          <span className="title">?</span>
        </div>
        <div className="text-center">
          <button type="button" onClick={handleOnClick} className="mt-3 btn enter-btn-size btn-primary">
            Knock! Knock!
          </button>
        </div>
      </div>
    </div>
  </>
);

export default Door;
