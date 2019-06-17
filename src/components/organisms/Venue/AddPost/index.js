import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Header } from '../../Header';
import { createPost, selectSelectedVenue } from '../../../../store/venues';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step4 } from './Step4';

const AddPost = ({ venue, createPost }) => {
   const [step, setStep] = useState(1);
   const [title, setTitle] = useState('');
   const [message, setMessage] = useState('');
   const [loading, setLoading] = useState(false);
   const edit = useCallback(() => setStep(1), [setStep]);

   return (
      <>
         <Header />
         {step === 1 && (
            <Step1
               venue={venue}
               title={title}
               setTitle={setTitle}
               message={message}
               setMessage={setMessage}
               setStep={setStep}
            />
         )}
         {step === 2 && <Step2 venue={venue} title={title} message={message} edit={edit} setStep={setStep} />}
         {step === 3 && <Step3 edit={edit} setStep={setStep} />}
         {step === 4 && (
            <Step4
               edit={edit}
               setStep={setStep}
               loading={loading}
               post={() => {
                  setLoading(true);
                  createPost(venue.id, title, message);
               }}
            />
         )}
      </>
   );
};

const mapState = createStructuredSelector({
   venue: selectSelectedVenue,
});
const mapDispatch = {
   createPost,
};

export default connect(
   mapState,
   mapDispatch,
)(AddPost);
