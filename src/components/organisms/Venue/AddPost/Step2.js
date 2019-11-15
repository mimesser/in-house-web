import React from 'react';

import { Button, FormGroup } from '../../../atoms';
import { Title } from '../newItemStyle';
import { StepLayout } from '../../../molecules';

export const Step2 = ({ venue: { name }, title, message, edit, setStep }) => (
  <StepLayout
    main={
      <>
        <Title houseName={name} action="confirm" />
        <FormGroup highlightValue>
          <label>title</label>
          <p>{title}</p>
        </FormGroup>
        <FormGroup highlightValue>
          <label>comment</label>
          <p>{message}</p>
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
