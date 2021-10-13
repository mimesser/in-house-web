import React, { useCallback } from 'react';
import Link from 'next/link';

import { FormGroup } from '../../atoms';
import { Dropdown } from '../../atoms/Dropdown'; // @HINT: probably want the CustomSelect here instead
import { StepLayout } from './StepLayout';
import { CounterInput, NextButton, BackButton } from '../../molecules';

const getOptionLabel = ({ name }) => name.toLowerCase();

export const Step1 = ({
  setStep,
  industries,
  industry,
  setIndustry,
  industryDesc,
  setIndustryDesc,
}) => {
  const handleIndustryChange = useCallback((i) => setIndustry(i), [setIndustry]);

  return (
    <StepLayout
      head="biz/org type"
      main={
        <>
          <FormGroup>
            <Dropdown
              value={industry}
              placeholder="industry / sphere"
              options={industries}
              onChange={handleIndustryChange}
              getOptionLabel={getOptionLabel}
            />
          </FormGroup>
          <CounterInput
            multiline
            value={industryDesc}
            onChange={setIndustryDesc}
            max={120}
            placeholder="please list any specific issues or pain points you want to be able to address for this industry (eg: “tips”, “equal opportunity”)"
            subtext="comment"
            rows={5}
          />
        </>
      }
      commands={
        <>
          <Link href="/houses">
            <BackButton>cancel</BackButton>
          </Link>
          <NextButton disabled={!industry} onClick={() => setStep(2)} />
        </>
      }
      step={1}
    />
  );
};
