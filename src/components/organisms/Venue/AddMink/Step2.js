import React from 'react';

import { FormGroup } from '../../../atoms';
import { StepLayout } from './StepLayout';
import { BackButton, NextButton } from '../../../molecules';

export const Step2 = ({ answer, question, edit, setStep, darkMode }) => (
  <StepLayout
    head="confirm"
    main={
      <>
        <FormGroup darkMode={darkMode}>
          <label>mink question</label>
          <p>{question}</p>
        </FormGroup>
        <FormGroup darkMode={darkMode}>
          <label>insider answer</label>
          <p>{answer}</p>
        </FormGroup>
      </>
    }
    commands={
      <>
        <BackButton secondary onClick={edit} />
        <NextButton onClick={() => setStep(3)} darkMode={darkMode} />
      </>
    }
    step={2}
    darkMode={darkMode}
  />
);
