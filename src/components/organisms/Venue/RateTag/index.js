import React, { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
   selectSelectedVenue,
   selectSelectedTag,
   selectRateTagConfirmation,
   setSelectedTag,
   rateTag,
} from '../../../../store/venues';
import { Modal } from '../../Modal';
import { RateConfirmation } from '../RateConfirmation';
import { Dial } from '../../../molecules';
import { ItemTitle, Layout, VenueTitle } from '../openCardStyle';

const RateTag = ({ tag, venue: { name: venueName }, rateTag }) => {
   const { name: tagName, userRate } = tag;
   const [value, setValue] = useState(userRate);
   useEffect(() => {
      setValue(userRate);
   }, [tag]);
   const handleChange = useCallback(
      newValue => {
         if (newValue < 0 || newValue > 10) {
            return;
         }
         setValue(newValue);

         if (newValue !== '') {
            rateTag(newValue);
         }
      },
      [setValue, rateTag],
   );

   return (
      <Layout>
         <VenueTitle>{venueName}</VenueTitle>
         <ItemTitle keepSpace>{tagName}</ItemTitle>
         <Dial size={450} padd={100} value={value} onChange={handleChange} />
      </Layout>
   );
};

const ModalWrapper = props => {
   const { tag, confirmation, setSelectedTag, venue } = props;
   const close = useCallback(() => setSelectedTag(undefined), []);

   const showRateTag = tag && !confirmation;
   const showConfirmation = tag && confirmation;

   return (
      <Modal open={!!tag} closeModal={close} inverse={showConfirmation}>
         {showRateTag ? <RateTag {...props} /> : null}
         {showConfirmation ? <RateConfirmation venueName={venue.name} title={tag.name} {...confirmation} /> : null}
      </Modal>
   );
};

const mapState = createStructuredSelector({
   venue: selectSelectedVenue,
   tag: selectSelectedTag,
   confirmation: selectRateTagConfirmation,
});
const mapDispatch = {
   setSelectedTag,
   rateTag,
};
export default connect(
   mapState,
   mapDispatch,
)(ModalWrapper);
