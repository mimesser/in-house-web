import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Button, H1 } from '../../atoms';
import { StepLayout } from './StepLayout';
import { FilePicker } from '../../molecules';
import { spacing } from '../../../style/spacing';

const PickImage = styled(FilePicker)`
  margin-top: ${spacing.xxxLarge};
`;

export const Step5 = ({ setStep, setImage }) => {
  const handleFileChange = useCallback(
    file => {
      setImage(file);
      setStep(6);
    },
    [setStep, setImage],
  );

  return (
    <StepLayout
      main={
        <>
          <H1>interior photo</H1>
          <p>show us you’re a house insider</p>

          <div>
            <PickImage onChange={handleFileChange} accept="image/*">
              upload photo
            </PickImage>
          </div>
        </>
      }
      commands={
        <>
          <Button secondary onClick={() => setStep(4)}>
            back
          </Button>
          <Button onClick={() => setStep(6)}>skip</Button>
        </>
      }
      step={5}
    />
  );
};
