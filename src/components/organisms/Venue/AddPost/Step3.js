import React from 'react';

import { Button } from '../../../atoms';
import { StepLayout } from '../newItemStyle';
import { FairSpeech } from '../FairSpeech';

export const Step3 = ({ venue: { name }, edit, setStep }) => (
   <StepLayout
      main={<FairSpeech houseName={name} acceptedTerms={false} toggleTerms={() => setStep(4)} />}
      commands={
         <>
            <Button secondary onClick={edit}>
               edit
            </Button>
            <Button disabled>next</Button>
         </>
      }
      step={3}
   />
);
