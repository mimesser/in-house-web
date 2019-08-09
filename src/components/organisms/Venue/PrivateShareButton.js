import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { PokeButton } from '../../molecules';
import { setPrivateShareItemId, selectSelectedVenue } from '../../../store/venues';
import { DEMO_VENUE_ID } from '../../../store/demo/data';

const Share = ({ id, openModal, venue }) => {
   const handleClick = useCallback(
      e => {
         e.stopPropagation();
         openModal(id);
      },
      [id],
   );
   return !venue.id === DEMO_VENUE_ID && <PokeButton onClick={handleClick} />;
};

const mapState = createStructuredSelector({
   venue: selectSelectedVenue,
});

const mapDispatch = {
   openModal: setPrivateShareItemId,
};
export default connect(
   mapState,
   mapDispatch,
)(Share);
