import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import { PokeButton } from '../../molecules';
import { setPrivateShareItemId } from '../../../store/venues';

const Share = ({ id, openModal }) => {
  const handleClick = useCallback(
    e => {
      e.stopPropagation();
      openModal(id);
    },
    [id],
  );
  return <PokeButton onClick={handleClick} />;
};

const mapDispatch = {
  openModal: setPrivateShareItemId,
};

export default connect(
  undefined,
  mapDispatch,
)(Share);
