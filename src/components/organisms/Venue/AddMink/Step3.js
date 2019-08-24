import React from 'react';

import { Button } from '../../../atoms';
import { StepLayout } from '../newItemStyle';
import { FairSpeech } from '../FairSpeech';

export const Step3 = ({ edit, setStep }) => (
  <StepLayout
    main={<FairSpeech acceptedTerms={false} toggleTerms={() => setStep(4)} />}
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
