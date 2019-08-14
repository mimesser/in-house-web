import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { PokeButton } from '../../molecules';
import { setPrivateShareItemId, selectSelectedVenue } from '../../../store/venues';
import { selectInDemo } from '../../../store/demo';

const Share = ({ id, openModal, inDemo }) => {
   const handleClick = useCallback(
      e => {
         e.stopPropagation();
         openModal(id);
      },
      [id],
   );
   return !inDemo && <PokeButton onClick={handleClick} />;
};

const mapState = createStructuredSelector({
   inDemo: selectInDemo,
});

const mapDispatch = {
   openModal: setPrivateShareItemId,
};
export default connect(
   mapState,
   mapDispatch,
)(Share);
