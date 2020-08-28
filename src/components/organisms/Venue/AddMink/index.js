import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { createMink, selectSelectedVenue } from '../../../../store/venues';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step4 } from './Step4';
import { normalizeAnswer } from '../normalizeAnswer';

const AddMink = ({ venue, createMink }) => {
  const [step, setStep] = useState(1);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const setNormalizedAnswer = useCallback(value => setAnswer(normalizeAnswer(value)), [setAnswer]);
  const edit = useCallback(() => setStep(1), [setStep]);
  const darkMode = true;

  return (
    <>
      {step === 1 && (
        <Step1
          venue={venue}
          answer={answer}
          setAnswer={setNormalizedAnswer}
          question={question}
          setQuestion={setQuestion}
          setStep={setStep}
          darkMode={darkMode}
        />
      )}
      {step === 2 && (
        <Step2 venue={venue} answer={answer} question={question} edit={edit} setStep={setStep} darkMode={darkMode} />
      )}
      {step === 3 && <Step3 edit={edit} setStep={setStep} darkMode={darkMode} />}
      {step === 4 && (
        <Step4
          edit={edit}
          setStep={setStep}
          loading={loading}
          post={() => {
            setLoading(true);
            createMink(venue.id, question, answer);
          }}
          darkMode={darkMode}
        />
      )}
    </>
  );
};

const mapState = createStructuredSelector({
  venue: selectSelectedVenue,
});
const mapDispatch = {
  createMink,
};

export default connect(mapState, mapDispatch)(AddMink);
