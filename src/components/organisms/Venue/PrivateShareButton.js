import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import { PokeButton } from '../../molecules';
import { setPrivateShareItem } from '../../../store/venues';

const Share = ({ id, type, openModal, onOpenSharePopup }) => {
  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      openModal(id, type);
      if (onOpenSharePopup && typeof onOpenSharePopup === 'function') {
        onOpenSharePopup();
      }
    },
    [id],
  );
  return <PokeButton onClick={handleClick} />;
};

const mapDispatch = {
  openModal: setPrivateShareItem,
};

export default connect(undefined, mapDispatch)(Share);
