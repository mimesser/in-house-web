import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { FormGroup, Industry, H1, Patent, Icon, ClearButton } from '../../../atoms';
import { StepLayout } from './StepLayout';
import { BackButton, NextButton } from '../../../molecules';

const FlexWrap = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Push = styled.span`
  margin-left: auto;
`;

export const Step2 = ({ venue: { id, name }, answer, question, edit, setStep }) => (
  <StepLayout
    head={
      <>
        <FlexWrap>
          <Industry>{name}</Industry>
          <Push />
          <Link href={`/houses?id=${id}&tab=mink`} as={`/houses/${id}/mink`}>
            <ClearButton>
              <Icon icon="close" />
            </ClearButton>
          </Link>
        </FlexWrap>
        <H1>confirm</H1>
        <Patent hide />
      </>
    }
    main={
      <>
        <FormGroup inverse>
          <label>mink question</label>
          <p>{question}</p>
        </FormGroup>
        <FormGroup inverse>
          <label>insider answer</label>
          <p>{answer}</p>
        </FormGroup>
      </>
    }
    commands={
      <>
        <BackButton secondary onClick={edit} />
        <NextButton onClick={() => setStep(3)} inverse />
      </>
    }
    step={2}
    inverse
  />
);
