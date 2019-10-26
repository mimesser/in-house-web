import React from 'react';

import { Button } from '../../../atoms';
import { FairSpeech } from '../FairSpeech';
import { StepLayout } from '../../../molecules';

export const Step3 = ({ venue: { name }, edit, setStep }) => (
  <StepLayout
    main={<FairSpeech houseName={name} acceptedTerms={false} toggleTerms={() => setStep(4)} />}
    commands={
      <>
        <Button secondary onClick={edit}>
          back
        </Button>
        <Button disabled>next</Button>
      </>
    }
    step={3}
  />
);
