import React from 'react';

import { Button, Heading } from '../../atoms';
import { StepLayout } from './StepLayout';
import { CounterInput } from '../../molecules/CounterInput';

export const Step2 = ({ setStep, name, setName }) => (
  <StepLayout
    main={
      <>
        <Heading>your job or org</Heading>
        <CounterInput value={name} onChange={setName} max={30} placeholder="name of your organization" />
      </>
    }
    commands={
      <>
        <Button secondary onClick={() => setStep(1)}>
          back
        </Button>
        <Button disabled={!name.trim()} onClick={() => setStep(3)}>
          next
        </Button>
      </>
    }
    step={2}
  />
);
