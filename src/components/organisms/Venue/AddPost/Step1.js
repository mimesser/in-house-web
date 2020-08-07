import React, { useCallback } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { BackButton, NextButton, CounterInput, FilePicker } from '../../../molecules';
import { StepLayout } from './StepLayout';
import { Icon } from '../../../atoms';
import { font, palette, spacing, cover } from '../../../../style';
const MAX_TITLE_LENGTH = 45;
const MAX_MESSAGE_LENGTH = 250;

const PickImage = styled(FilePicker)`
  background: none;
  color: ${({ image }) => (image ? '#000' : '#ccc')};
`;

const IconWrapper = styled.div`
  > ${Icon} {
    margin-left: -${spacing.md};
    margin-right: ${spacing.md};
    width: ${spacing.xxl};
  }
`;

export const Step1 = ({ venue: { id }, title, setTitle, message, setMessage, setStep, image, setImage }) => {
  const handleFileChange = useCallback(
    (file) => {
      console.log('# selected: ', file);
      setImage(file);
    },
    [setImage],
  );

  return (
    <StepLayout
      head="new post"
      main={
        <>
          <CounterInput value={title} onChange={setTitle} placeholder="title" max={MAX_TITLE_LENGTH} />

          <PickImage onChange={handleFileChange} accept="image/png, image/jpeg, image/gif" wide outline>
            <IconWrapper>
              <Icon icon="camera" size={1.5} />
            </IconWrapper>
            {image ? image.name : '(png, jpg, gif)'}

            <Icon icon="plus" />
          </PickImage>
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
};
