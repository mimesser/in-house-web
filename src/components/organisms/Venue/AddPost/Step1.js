import React, { useCallback } from 'react';
import Link from 'next/link';

import { Button, Input, Textarea } from '../../../atoms';
import { StepLayout } from './StepLayout';
import { Title } from './Title';
import { CharLimit, FormGroup } from './style';

// TODO: if styling will be the same - consolidate edit controls

const MAX_TITLE_LENGTH = 25;
const EditTitle = ({ value, setTitle }) => {
   const handleChange = useCallback(e => {
      const { value } = e.currentTarget;
      setTitle(value.substring(0, MAX_TITLE_LENGTH));
   }, []);

   return (
      <FormGroup>
         <label>
            <Input onChange={handleChange} value={value} placeholder="title" autocomplete="off" />
         </label>
         <CharLimit reached={value.length === MAX_TITLE_LENGTH}>{MAX_TITLE_LENGTH}</CharLimit>
      </FormGroup>
   );
};

const MAX_MESSAGE_LENGTH = 150;
const EditMessage = ({ value, setMessage }) => {
   const handleChange = useCallback(e => {
      const { value } = e.currentTarget;
      setMessage(value.substring(0, MAX_MESSAGE_LENGTH));
   }, []);

   return (
      <FormGroup>
         <label>
            <Textarea onChange={handleChange} value={value} rows={4} placeholder="type something" />
         </label>
         <CharLimit reached={value.length === MAX_MESSAGE_LENGTH}>{MAX_MESSAGE_LENGTH}</CharLimit>
      </FormGroup>
   );
};

export const Step1 = ({ venue: { id, name }, title, setTitle, message, setMessage, setStep }) => (
   <StepLayout
      main={
         <>
            <Title houseName={name} verb="add" />
            <EditTitle value={title} setTitle={setTitle} />
            <EditMessage value={message} setMessage={setMessage} />
         </>
      }
      commands={
         <>
            <Link href={`/houses?id=${id}&tab=post`} as={`/houses/${id}/post`}>
               <Button secondary>Cancel</Button>
            </Link>
            <Button onClick={() => setStep(2)} disabled={!message.trim() || !title.trim()}>
               next
            </Button>
         </>
      }
      step={1}
   />
);
