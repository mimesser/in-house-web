import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { PokeButton } from '../../molecules';
import { setPrivateShareItemId } from '../../../store/venues';
import { selectIsDemoing } from '../../../store/demo';

const Share = ({ id, openModal, isDemoing }) => {
   const handleClick = useCallback(
      e => {
         e.stopPropagation();
         openModal(id);
      },
      [id],
   );
   return !isDemoing && <PokeButton onClick={handleClick} />;
};

const mapState = createStructuredSelector({
   isDemoing: selectIsDemoing,
});

const mapDispatch = {
   openModal: setPrivateShareItemId,
};
export default connect(
   mapState,
   mapDispatch,
)(Share);
