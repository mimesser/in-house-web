import React from 'react';

import { FairSpeech } from '../FairSpeech';
import { BackButton, NextButton } from '../../../molecules';
import { StepLayout } from './StepLayout';

export const Step4 = ({ setStep, edit, loading, post }) => (
  <StepLayout
    hideProgress
    main={<FairSpeech acceptedTerms toggleTerms={() => setStep(3)} />}
    commands={
      <>
        <BackButton onClick={edit} />
        <NextButton loading={loading} onClick={post}>
          yes, post
        </NextButton>
      </>
    }
    step={4}
  />
);
