import React from 'react';

import { FairSpeech } from '../FairSpeech';
import { BackButton, NextButton } from '../../../molecules';
import { StepLayout } from './StepLayout';

export const Step3 = ({ venue: { name }, edit, setStep }) => (
  <StepLayout
    hideProgress
    main={<FairSpeech houseName={name} acceptedTerms={false} toggleTerms={() => setStep(4)} />}
    commands={
      <>
        <BackButton onClick={edit} />
        <NextButton disabled>yes, post</NextButton>
      </>
    }
    step={3}
  />
);
