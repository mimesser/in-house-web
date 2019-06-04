import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router';

import { Modal } from '../Modal';
import InsiderQuestionChallenge from '../InsiderQuestionChallenge';
import { setSelectedVenue, selectInsiderChallengeForm } from '../../../store/venues';

const Venue = ({ id, router, challengeFormData }) => {
   const dismissForm = () => {
      router.push('/houses', '/houses', { shallow: true });
   };
   const canDismissChallengeModal = !challengeFormData || !challengeFormData.isAnswerCorrect;

   return (
      <>
         <h1>House {id} page</h1>
         <Modal open={!!challengeFormData} closeModal={dismissForm} canDismiss={canDismissChallengeModal}>
            {challengeFormData ? <InsiderQuestionChallenge /> : null}
         </Modal>
      </>
   );
};

const mapStateToProps = createStructuredSelector({
   challengeFormData: selectInsiderChallengeForm,
});

const mapDispatch = {
   setSelectedVenue,
};

export default connect(
   mapStateToProps,
   mapDispatch,
)(withRouter(Venue));
