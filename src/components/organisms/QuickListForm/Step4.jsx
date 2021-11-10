import React from 'react';
import styled from 'styled-components';

import { H1, Patent } from '../../atoms';
import { StepLayout } from './StepLayout';
import { BackButton, CounterInput, NextButton } from '../../molecules';
import { calcRem, palette } from '../../../style';
import { Hint } from './Hint';

// TODO: should be common with AddMink
const MAX_QUESTION_LENGTH = 120;
const MAX_ANSWER_LENGTH = 25;

const Heading = styled(H1).attrs(() => ({
  children: (
    <>
      starter MINK<sup>©</sup>
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

export const Step4 = ({ setStep, answer, setAnswer, question, setQuestion }) => (
  <StepLayout
    head={<Heading />}
    main={
      <>
        <Hint>a team security question that only your teammates will know</Hint>
        <CounterInput
          value={question}
          onChange={setQuestion}
          multiline
          max={MAX_QUESTION_LENGTH}
          rows={4}
          placeholder="out key code to the bathroom"
          subtext="question"
        />
        <CounterInput
          value={answer}
          onChange={setAnswer}
          max={MAX_ANSWER_LENGTH}
          placeholder="1234"
          autocomplete="off"
          spellcheck="false"
          subtext="secret answer"
        />
      </>
    }
    commands={
      <>
        <BackButton secondary onClick={() => setStep(3)} />
        <NextButton disabled={!answer.trim() || !question.trim()} onClick={() => setStep(5)} />
      </>
    }
    step={4}
  />
);
