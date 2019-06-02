import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router';

import { Modal } from '../Modal';
import InsiderQuestionChallenge from '../InsiderQuestionChallenge';
import { selectMinkAnswerStatus, setSelectedVenue } from '../../../store/venues';

const MINK_FORM_DELAY = 500;
const CONFIRMATION_DELAY = 1000;

const Venue = ({ id, setSelectedVenue, router, answerStatus }) => {
   const [minkFormShown, setMinkFormShown] = useState(false);

   useEffect(() => {
      const timer = setTimeout(() => {
         setMinkFormShown(true);
      }, MINK_FORM_DELAY);

      return () => clearTimeout(timer);
   }, []);

   useEffect(() => {
      if (answerStatus && answerStatus.isAnswerCorrect) {
         const timer = setTimeout(() => {
            setMinkFormShown(false);
         }, CONFIRMATION_DELAY);

         return () => clearTimeout(timer);
      }
      return undefined;
   }, [answerStatus]);

   const dismissForm = () => {
      setMinkFormShown(false);
      setSelectedVenue(undefined);
      router.push('/houses');
   };

   return (
      <>
         <h1>House {id} page</h1>
         <Modal open={minkFormShown} closeModal={dismissForm}>
            {minkFormShown ? <InsiderQuestionChallenge /> : null}
         </Modal>
      </>
   );
};

const mapStateToProps = createStructuredSelector({
   answerStatus: selectMinkAnswerStatus,
});

const mapDispatch = {
   setSelectedVenue,
};

export default connect(
   mapStateToProps,
   mapDispatch,
)(withRouter(Venue));
