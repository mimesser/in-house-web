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
import { Slider } from '../../../molecules';
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
         <Slider size={250} value={value} onChange={handleChange} />
      </Layout>
   );
};

const ModalWrapper = props => {
   const { tag, confirmation, setSelectedTag, venue } = props;
   const close = useCallback(() => setSelectedTag(undefined), []);

   return (
      <Modal open={!!tag} closeModal={close}>
         {tag && !confirmation ? <RateTag {...props} /> : null}
         {tag && confirmation ? <RateConfirmation venueName={venue.name} title={tag.name} {...confirmation} /> : null}
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
