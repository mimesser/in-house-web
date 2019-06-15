import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
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
import { Heading } from '../../../atoms';
import { spacing } from '../../../../theme';
import { RateConfirmation } from '../RateConfirmation';

const Layout = styled.div`
   width: 100%;
   padding: ${spacing.medium};

   display: flex;
   flex-direction: column;

   input {
      width: 7rem;
      height: 3rem;
   }
`;

const RateTag = ({ tag: { name: tagName, userRate }, venue: { name: venueName }, rateTag }) => {
   const [value, setValue] = useState(userRate || '');
   const handleChange = useCallback(
      e => {
         const newValue = e.currentTarget.value;
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
         <div>{venueName}</div>
         <Heading>{tagName}</Heading>
         <input type="number" value={value} onChange={handleChange} min="0" max="10" placeholder="Please rate" />
      </Layout>
   );
};

const ModalWrapper = props => {
   const { tag, confirmation, setSelectedTag, venue } = props;
   const close = useCallback(() => setSelectedTag(undefined), []);

   return (
      <Modal open={!!tag} closeModal={close} canClose={false}>
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
