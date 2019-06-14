import React from 'react';

import { Button } from '../../../atoms';
import { StepLayout } from './StepLayout';
import { Title } from './Title';
import { FormGroup } from './style';

export const Step2 = ({ venue: { name }, answer, question, edit, setStep }) => (
   <StepLayout
      main={
         <>
            <Title houseName={name} verb="confirm" />
            <FormGroup readonly>
               <label>mink question</label>
               <p>{question}</p>
            </FormGroup>
            <FormGroup readonly>
               <label>insider answer</label>
               <p>{answer}</p>
            </FormGroup>
         </>
      }
      commands={
         <>
            <Button secondary onClick={edit}>
               edit
            </Button>
            <Button onClick={() => setStep(3)}>next</Button>
         </>
      }
      step={2}
   />
);
