import React from 'react';

import { FormGroup } from '../../../atoms';
import { StepLayout } from './StepLayout';
import { BackButton, NextButton } from '../../../molecules';

export const Step2 = ({ answer, question, edit, setStep }) => (
  <StepLayout
    head="confirm"
    main={
      <>
        <FormGroup>
          <label>mink question</label>
          <p>{question}</p>
        </FormGroup>
        <FormGroup>
          <label>insider answer</label>
          <p>{answer}</p>
        </FormGroup>
      </>
    }
    commands={
      <>
        <BackButton secondary onClick={edit} />
        <NextButton onClick={() => setStep(3)} />
      </>
    }
    step={2}
  />
);
