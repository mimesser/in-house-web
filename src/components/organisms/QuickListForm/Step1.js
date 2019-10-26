import React, { useCallback } from 'react';

import { Button, Dropdown, Heading } from '../../atoms';
import { StepLayout } from './StepLayout';
import { CounterInput } from '../../molecules';

const getOptionLabel = ({ name }) => name;

export const Step1 = ({ setStep, industries, industry, setIndustry, industryDesc, setIndustryDesc }) => {
  const handleIndustryChange = useCallback(i => setIndustry(i), [setIndustry]);

  return (
    <StepLayout
      main={
        <>
          <Heading>industry</Heading>
          <Dropdown
            value={industry}
            placeholder="choose industry for your house"
            options={industries}
            onChange={handleIndustryChange}
            getOptionLabel={getOptionLabel}
          />
          <CounterInput
            multiline
            value={industryDesc}
            onChange={setIndustryDesc}
            max={500}
            placeholder="please list any specific issues or pain points you want to be able to address for this industry (eg: “tips”, “equal opportunity”)"
            rows={8}
          />
        </>
      }
      commands={
        <Button disabled={!industry} onClick={() => setStep(2)}>
          next
        </Button>
      }
      step={1}
    />
  );
};
