import React from 'react';
import Link from 'next/link';

import { Button } from '../../../atoms';
import { CounterInput } from '../../../molecules';
import { StepLayout } from './StepLayout';
import { Title } from './Title';

const MAX_QUESTION_LENGTH = 120;
const MAX_ANSWER_LENGTH = 25;

export const Step1 = ({ venue: { id, name }, answer, setAnswer, question, setQuestion, setStep }) => (
   <StepLayout
      main={
         <>
            <Title houseName={name} verb="add" />
            <CounterInput
               value={question}
               onChange={setQuestion}
               multiline
               max={MAX_QUESTION_LENGTH}
               label="mink question"
               rows={4}
               placeholder="eg: “what is the conference room’s wifi password”"
            />
            <CounterInput
               value={answer}
               onChange={setAnswer}
               max={MAX_ANSWER_LENGTH}
               label="secret answer"
               placeholder="one word / no spaces"
               autocomplete="off"
               spellcheck="false"
            />
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
