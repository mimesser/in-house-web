import React from 'react';

import { Button } from '../../../atoms';
import { FairSpeech } from '../FairSpeech';
import { StepLayout } from '../../../molecules';

export const Step4 = ({ setStep, edit, loading, post }) => (
  <StepLayout
    main={<FairSpeech acceptedTerms toggleTerms={() => setStep(3)} />}
    commands={
      <>
        <Button secondary onClick={edit}>
          no, back
        </Button>
        <Button loading={loading} onClick={post}>
          yes, post
        </Button>
      </>
    }
    step={4}
  />
);
