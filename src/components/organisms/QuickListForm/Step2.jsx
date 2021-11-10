import React from 'react';

import { StepLayout } from './StepLayout';
import { NextButton, BackButton, CounterInput } from '../../molecules';

export const Step2 = ({ setStep, name, setName }) => (
  <StepLayout
    head="name"
    main={
      <CounterInput
        value={name}
        onChange={setName}
        max={30}
        placeholder="my house"
        subtext="biz / org / group name"
      />
    }
    commands={
      <>
        <BackButton secondary onClick={() => setStep(1)} />
        <NextButton disabled={!name.trim()} onClick={() => setStep(3)} />
      </>
    }
    step={2}
  />
);
