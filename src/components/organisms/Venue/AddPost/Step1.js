import React from 'react';
import Link from 'next/link';

import { BackButton, NextButton, CounterInput } from '../../../molecules';
import { StepLayout } from './StepLayout';

const MAX_TITLE_LENGTH = 45;
const MAX_MESSAGE_LENGTH = 250;

export const Step1 = ({ venue: { id }, title, setTitle, message, setMessage, setStep }) => (
  <StepLayout
    head="new post"
    main={
      <>
        <CounterInput value={title} onChange={setTitle} placeholder="title" max={MAX_TITLE_LENGTH} />
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
          <BackButton>cancel</BackButton>
        </Link>
        <NextButton onClick={() => setStep(2)} disabled={!message.trim() || !title.trim()} />
      </>
    }
    step={1}
  />
);
