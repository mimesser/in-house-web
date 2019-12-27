import React from 'react';

import { StepLayout } from './StepLayout';
import { CounterInput, BackButton, NextButton } from '../../molecules';

export const Step3 = ({ setStep, address, setAddress, zip, setZip, country, setCountry, city, setCity }) => (
  <StepLayout
    head="address"
    main={
      <>
        <CounterInput value={country} onChange={setCountry} max={20} placeholder="my country" subtext="country" />
        <CounterInput value={city} onChange={setCity} max={20} placeholder="my city" subtext="city" />
        <CounterInput
          value={address}
          onChange={setAddress}
          max={40}
          placeholder="123 free speech way"
          subtext="address"
        />
        <CounterInput value={zip} onChange={setZip} max={15} placeholder="11201" subtext="zip" />
      </>
    }
    commands={
      <>
        <BackButton secondary onClick={() => setStep(2)} />
        <NextButton
          disabled={!country.trim() || !address.trim() || !zip.trim() || !city.trim()}
          onClick={() => setStep(4)}
        />
      </>
    }
    step={3}
  />
);
