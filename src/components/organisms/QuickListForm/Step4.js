import React from 'react';

import { Button, H1, Patent } from '../../atoms';
import { StepLayout } from './StepLayout';
import { CounterInput } from '../../molecules/CounterInput';
import { FormTip } from '../../molecules';

// TODO: should be common with AddMink
const MAX_QUESTION_LENGTH = 120;
const MAX_ANSWER_LENGTH = 25;

export const Step4 = ({ setStep, answer, setAnswer, question, setQuestion }) => (
  <StepLayout
    main={
      <>
        <H1>
          starter MINK<sup>©</sup>
          <Patent />
        </H1>
        <p>a team security question to that only your coworkers will know</p>
        <CounterInput
          value={question}
          onChange={setQuestion}
          multiline
          max={MAX_QUESTION_LENGTH}
          rows={4}
          placeholder="eg: “what is the conference room’s wifi password”"
        />
        <FormTip>(nothing someone could guess or google.)</FormTip>
        <CounterInput
          value={answer}
          onChange={setAnswer}
          max={MAX_ANSWER_LENGTH}
          placeholder="secret answer"
          autocomplete="off"
          spellcheck="false"
        />
        <FormTip>no spaces / not case sensitive</FormTip>
      </>
    }
    commands={
      <>
        <Button secondary onClick={() => setStep(3)}>
          back
        </Button>
        <Button disabled={!answer.trim() || !question.trim()} onClick={() => setStep(5)}>
          next
        </Button>
      </>
    }
    step={4}
  />
);
