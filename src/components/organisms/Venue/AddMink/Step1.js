import React from 'react';
import Link from 'next/link';

import { Button } from '../../../atoms';
import { CounterInput, Patent } from '../../../molecules';
import { StepLayout, Tip, Title } from '../newItemStyle';

const MAX_QUESTION_LENGTH = 120;
const MAX_ANSWER_LENGTH = 25;

export const Step1 = ({ venue: { id, name }, answer, setAnswer, question, setQuestion, setStep }) => (
  <StepLayout
    main={
      <>
        <Title
          houseName={name}
          verb="add"
          action={
            <>
              new MINK<sup>©</sup>
              <Patent />
            </>
          }
        />
        <CounterInput
          value={question}
          onChange={setQuestion}
          multiline
          max={MAX_QUESTION_LENGTH}
          rows={4}
          placeholder="eg: “what is the conference room’s wifi password”"
        />
        <Tip>(nothing someone could guess or google.)</Tip>
        <CounterInput
          value={answer}
          onChange={setAnswer}
          max={MAX_ANSWER_LENGTH}
          placeholder="secret answer"
          autocomplete="off"
          spellcheck="false"
        />
        <Tip>no spaces / not case sensitive</Tip>
      </>
    }
    commands={
      <>
        <Link href={`/houses?id=${id}&tab=mink`} as={`/houses/${id}/mink`}>
          <Button secondary>Cancel</Button>
        </Link>
        <Button onClick={() => setStep(2)} disabled={!question.trim() || !answer.trim()}>
          next
        </Button>
      </>
    }
    step={1}
  />
);
