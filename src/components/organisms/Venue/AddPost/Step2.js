import React from 'react';

import { FormGroup } from '../../../atoms';
import { BackButton, NextButton } from '../../../molecules';
import { StepLayout } from './StepLayout';

export const Step2 = ({ title, message, edit, setStep }) => (
  <StepLayout
    head="confirm"
    main={
      <>
        <FormGroup>
          <label>title</label>
          <p>{title}</p>
        </FormGroup>
        <FormGroup>
          <label>comment</label>
          <p>{message}</p>
        </FormGroup>
      </>
    }
    commands={
      <>
        <BackButton onClick={edit} />
        <NextButton onClick={() => setStep(3)} />
      </>
    }
    step={2}
  />
);
