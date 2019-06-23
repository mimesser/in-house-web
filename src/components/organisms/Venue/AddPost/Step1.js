import React from 'react';
import Link from 'next/link';

import { Button } from '../../../atoms';
import { CounterInput } from '../../../molecules';
import { StepLayout } from './StepLayout';
import { Title } from './Title';

const MAX_TITLE_LENGTH = 25;
const MAX_MESSAGE_LENGTH = 150;

export const Step1 = ({ venue: { id, name }, title, setTitle, message, setMessage, setStep }) => (
   <StepLayout
      main={
         <>
            <Title houseName={name} verb="add" />
            <CounterInput
               value={title}
               onChange={setTitle}
               placeholder="title"
               autocomplete="off"
               max={MAX_TITLE_LENGTH}
            />
            <CounterInput
               value={message}
               onChange={setMessage}
               multiline
               max={MAX_MESSAGE_LENGTH}
               rows={4}
               placeholder="type something"
            />
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
