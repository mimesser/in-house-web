import React, { useCallback } from 'react';
import Link from 'next/link';

import { Button, Input, Textarea } from '../../../atoms';
import { StepLayout } from './StepLayout';
import { Title } from './Title';
import { CharLimit, FormGroup } from './style';

// TODO: if styling will be the same - consolidate edit controls

const MAX_QUESTION_LENGTH = 120;
const EditQuestion = ({ value, setQuestion }) => {
   const handleChange = useCallback(e => {
      const { value } = e.currentTarget;
      setQuestion(value.substring(0, MAX_QUESTION_LENGTH));
   }, []);

   return (
      <FormGroup>
         <label>
            mink question
            <Textarea
               onChange={handleChange}
               value={value}
               rows={4}
               placeholder="eg: “what is the conference room’s wifi password”"
            />
         </label>
         <CharLimit reached={value.length === MAX_QUESTION_LENGTH}>{MAX_QUESTION_LENGTH}</CharLimit>
      </FormGroup>
   );
};

const MAX_ANSWER_LENGTH = 25;
const EditAnswer = ({ value, setAnswer }) => {
   const handleChange = useCallback(e => {
      const { value } = e.currentTarget;
      setAnswer(value.substring(0, MAX_ANSWER_LENGTH));
   }, []);

   return (
      <FormGroup>
         <label>
            secret answer
            <Input onChange={handleChange} value={value} placeholder="one word / no spaces" />
         </label>
         <CharLimit reached={value.length === MAX_ANSWER_LENGTH}>{MAX_ANSWER_LENGTH}</CharLimit>
      </FormGroup>
   );
};

export const Step1 = ({ venue: { id, name }, answer, setAnswer, question, setQuestion, setStep }) => (
   <StepLayout
      main={
         <>
            <Title houseName={name} verb="add" />
            <EditQuestion value={question} setQuestion={setQuestion} />
            <EditAnswer value={answer} setAnswer={setAnswer} />
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
