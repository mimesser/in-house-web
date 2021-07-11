import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { H1, Patent, Industry, Icon, ClearButton } from '../../../atoms';
import { CounterInput, BackButton, NextButton, Cl } from '../../../molecules';
import { palette } from '../../../../style';
import { StepLayout } from './StepLayout';
import { formatMovementURL } from '../../../../utils/format';

const MAX_QUESTION_LENGTH = 120;
const MAX_ANSWER_LENGTH = 25;

const FlexWrap = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Heading = styled(H1).attrs(() => ({
  children: (
    <>
      <div>
        new mink <small>©️</small>
      </div>
      <Patent />
    </>
  ),
}))`
  small {
    font-size: 60%;
  }
  ${Patent} {
    color: ${palette.gray};
    display: flex;
  }
`;

const Push = styled.span`
  margin-left: auto;
`;

export const Step1 = ({ venue: { id, name, industry: { lite }}, answer, setAnswer, question, setQuestion, setStep }) => {
  const movementName = formatMovementURL(name);

  return (
    <StepLayout
      head={
        <>
          <FlexWrap>
            <Industry>{name}</Industry>
            <Push />
            <Link
              href={`/houses?id=${id}&tab=mink`} 
              as={`/${lite ? 'movement' : 'houses'}/${lite ? movementName : id}/mink`}
            >
              <ClearButton>
                <Icon icon="close" />
              </ClearButton>
            </Link>
          </FlexWrap>
          <Heading />
        </>
      }
      main={
        <>
          <CounterInput
            value={question}
            onChange={setQuestion}
            multiline
            max={MAX_QUESTION_LENGTH}
            rows={4}
            placeholder="eg: what is the conference room’s wifi password"
            subtext="nothing someone could guess or google"
          />
          <CounterInput
            value={answer}
            onChange={setAnswer}
            max={MAX_ANSWER_LENGTH}
            placeholder="secret answer"
            autocomplete="off"
            spellcheck="false"
            subtext="no spaces / not case sensitive"
          />
        </>
      }
      commands={
        <>
          <Link
            href={`/houses?id=${id}&tab=mink`}
            as={`/${lite ? 'movement' : 'houses'}/${lite ? movementName : id}/mink`}
          >
            <BackButton>cancel</BackButton>
          </Link>
          <NextButton disabled={!question.trim() || !answer.trim()} onClick={() => setStep(2)} inverse />
        </>
      }
      step={1}
      inverse
    />
  )
};
