import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { H1, Patent } from '../../../atoms';
import { CounterInput, BackButton, NextButton } from '../../../molecules';
import { calcRem, palette } from '../../../../style';
import { StepLayout } from './StepLayout';

const MAX_QUESTION_LENGTH = 120;
const MAX_ANSWER_LENGTH = 25;

const Heading = styled(H1).attrs(() => ({
  children: (
    <>
      new mink©️
      <Patent />
    </>
  ),
}))`
  position: relative;
  ${Patent} {
    position: absolute;
    left: 0;
    top: ${calcRem('42px')};
    color: ${palette.gray};
  }
`;

export const Step1 = ({ venue: { id }, answer, setAnswer, question, setQuestion, setStep }) => (
  <StepLayout
    head={<Heading />}
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
        <Link href={`/houses?id=${id}&tab=mink`} as={`/houses/${id}/mink`}>
          <BackButton>cancel</BackButton>
        </Link>
        <NextButton disabled={!question.trim() || !answer.trim()} onClick={() => setStep(2)} />
      </>
    }
    step={1}
  />
);
