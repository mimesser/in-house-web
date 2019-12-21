import React from 'react';
import Link from 'next/link';

import { Button } from '../../../atoms';
import { CounterInput, StepLayout } from '../../../molecules';
import { Title } from '../newItemStyle';

const MAX_TITLE_LENGTH = 45;
const MAX_MESSAGE_LENGTH = 250;

export const Step1 = ({ venue: { id, name }, title, setTitle, message, setMessage, setStep }) => (
  <StepLayout
    main={
      <>
        <Title houseName={name} action="new post" />
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
          <Button secondary>cancel</Button>
        </Link>
        <Button onClick={() => setStep(2)} disabled={!message.trim() || !title.trim()}>
          next
        </Button>
      </>
    }
    step={1}
  />
);
