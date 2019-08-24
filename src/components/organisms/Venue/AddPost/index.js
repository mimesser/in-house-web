import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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
  const setNormalizedTitle = useCallback(t => setTitle(t.toLowerCase()), [setTitle]);

  return (
    <>
      {step === 1 && (
        <Step1
          venue={venue}
          title={title}
          setTitle={setNormalizedTitle}
          message={message}
          setMessage={setMessage}
          setStep={setStep}
        />
      )}
      {step === 2 && <Step2 venue={venue} title={title} message={message} edit={edit} setStep={setStep} />}
      {step === 3 && <Step3 venue={venue} edit={edit} setStep={setStep} />}
      {step === 4 && (
        <Step4
          edit={edit}
          setStep={setStep}
          loading={loading}
          venue={venue}
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
