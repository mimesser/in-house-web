import React, { useCallback } from 'react';
import styled from 'styled-components';

import { StepLayout } from './StepLayout';
import { FilePicker, BackButton, NextButton } from '../../molecules';
import { Hint } from './Hint';
import { Icon } from '../../atoms';

const PickImage = styled(FilePicker)`
  margin: auto 0;
  background: none;
`;

export const Step5 = ({ setStep, setImage, image }) => {
  const handleFileChange = useCallback(
    (file) => {
      setImage(file);
      setStep(6);
    },
    [setStep, setImage],
  );

  return (
    <StepLayout
      head="interior photo"
      main={
        <>
          <Hint>so we know you’re a real insider</Hint>
          <PickImage onChange={handleFileChange} accept="image/*" wide dashed>
            add a photo
            <Icon icon="plus" />
          </PickImage>
        </>
      }
      commands={
        <>
          <BackButton secondary onClick={() => setStep(4)} />
          <NextButton disabled={!image} onClick={() => setStep(6)} />
        </>
      }
      step={5}
    />
  );
};
