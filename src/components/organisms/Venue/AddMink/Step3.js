import React from 'react';

import { FairSpeech } from '../FairSpeech';
import { BackButton, NextButton } from '../../../molecules';
import { StepLayout } from './StepLayout';

export const Step3 = ({ edit, setStep, darkMode }) => (
  <StepLayout
    hideProgress
    main={<FairSpeech acceptedTerms={false} toggleTerms={() => setStep(4)} />}
    commands={
      <>
        <BackButton secondary onClick={edit} />
        <NextButton disabled darkMode={darkMode}>yes, post</NextButton>
      </>
    }
    step={3}
    darkMode={darkMode}
  />
);
