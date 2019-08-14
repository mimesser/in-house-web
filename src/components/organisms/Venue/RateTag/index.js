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
import { ItemTitle, Layout, SubTitle } from '../openCardStyle';

const RateTag = ({ tag, venue: { name: venueName }, rateTag, setRated, rated }) => {
   const { name: tagName, userRate } = tag;
   const [value, setValue] = useState(userRate);

   useEffect(() => {
      setValue(userRate);
      return () => setRated(false);
   }, [tag]);
   const handleChange = useCallback(
      newValue => {
         if (newValue < 0 || newValue > 10) {
            return;
         }
         setValue(newValue);

         if (newValue !== '') {
            setRated(true);
            rateTag(newValue);
         }
      },
      [setValue, rateTag],
   );

   return (
      <Layout>
         <ItemTitle keepSpace={!rated} inverse>
            {tagName}
         </ItemTitle>
         {rated && <SubTitle>you rated</SubTitle>}
         <Dial size={450} padd={100} value={value} onChange={handleChange} inverse={rated} />
      </Layout>
   );
};

const ModalWrapper = props => {
   const { tag, confirmation, setSelectedTag, venue } = props;
   const close = useCallback(() => setSelectedTag(undefined), []);
   const [rated, setRated] = useState(false);

   const showRateTag = tag && !confirmation;
   const showConfirmation = tag && confirmation;
   const inverse = showConfirmation || rated;

   return (
      <Modal open={!!tag} closeModal={close} inverse={inverse} title={venue.name}>
         {showRateTag ? <RateTag {...props} rated={rated} setRated={setRated} /> : null}
         {showConfirmation ? <RateConfirmation title={tag.name} {...confirmation} /> : null}
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
