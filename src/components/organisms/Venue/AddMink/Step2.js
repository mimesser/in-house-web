import React from 'react';

import { Button, FormGroup } from '../../../atoms';
import { Title } from '../newItemStyle';
import { StepLayout } from '../../../molecules';

export const Step2 = ({ venue: { name }, answer, question, edit, setStep }) => (
  <StepLayout
    main={
      <>
        <Title houseName={name} action="confirm" />
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
          back
        </Button>
        <Button onClick={() => setStep(3)}>next</Button>
      </>
    }
    step={2}
  />
);
