import React from 'react';

import { Button } from '../../../atoms';
import { StepLayout } from './StepLayout';
import { FairSpeech } from './FairSpeech';

export const Step4 = ({ venue: { name }, setStep, edit, loading, post }) => (
   <StepLayout
      main={<FairSpeech houseName={name} acceptedTerms toggleTerms={() => setStep(3)} />}
      commands={
         <>
            <Button secondary onClick={edit}>
               no, edit
            </Button>
            <Button loading={loading} onClick={post}>
               yes, post
            </Button>
         </>
      }
      step={4}
   />
);
