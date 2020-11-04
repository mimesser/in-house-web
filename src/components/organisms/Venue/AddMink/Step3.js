import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { Icon, ClearButton, Industry } from '../../../atoms';
import { FairSpeech } from '../FairSpeech';
import { BackButton, NextButton } from '../../../molecules';
import { StepLayout } from './StepLayout';
import { formatMovementURL } from '../../../../utils/format';

const FlexWrap = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Push = styled.span`
  margin-left: auto;
`;

export const Step3 = ({ venue: { id, name, industry: { lite }}, edit, setStep }) => (
  <StepLayout
    hideProgress
    head={
      <>
        <FlexWrap>
          <Industry>{name}</Industry>
          <Push />
          <Link
            href={`/houses?id=${id}&tab=mink`}
            as={`/${lite ? 'movement' : 'houses'}/${lite ? formatMovementURL(name) : id}/mink`}
          >
            <ClearButton>
              <Icon icon="close" />
            </ClearButton>
          </Link>
        </FlexWrap>
      </>
    }
    main={<FairSpeech acceptedTerms={false} toggleTerms={() => setStep(4)} />}
    commands={
      <>
        <BackButton secondary onClick={edit} />
        <NextButton disabled inverse>yes, post</NextButton>
      </>
    }
    step={3}
    inverse
  />
);
