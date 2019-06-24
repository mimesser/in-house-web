import React, { useCallback, useState, useEffect } from 'react';
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
import { Slider } from '../../../molecules';

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
         <div>{venueName}</div>
         <Heading>{tagName}</Heading>
         <Slider value={value} onChange={handleChange} />
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
