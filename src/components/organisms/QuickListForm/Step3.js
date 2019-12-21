import React from 'react';

import { Button, H1 } from '../../atoms';
import { StepLayout } from './StepLayout';
import { CounterInput } from '../../molecules/CounterInput';

export const Step3 = ({ setStep, address, setAddress, zip, setZip, country, setCountry, city, setCity }) => (
  <StepLayout
    main={
      <>
        <H1>address</H1>
        <CounterInput value={country} onChange={setCountry} max={20} placeholder="country" />
        <CounterInput value={city} onChange={setCity} max={20} placeholder="city" />
        <CounterInput value={address} onChange={setAddress} max={40} placeholder="street address" />
        <CounterInput value={zip} onChange={setZip} max={15} placeholder="zip code" />
      </>
    }
    commands={
      <>
        <Button secondary onClick={() => setStep(2)}>
          back
        </Button>
        <Button disabled={!address.trim() || !zip.trim() || !country.trim() || !city.trim()} onClick={() => setStep(4)}>
          next
        </Button>
      </>
    }
    step={3}
  />
);
