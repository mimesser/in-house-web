import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { Industry, Icon, ClearButton } from '../../../atoms';
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

export const Step4 = ({ venue: { id, name, industry: { lite }}, setStep, edit, loading, post }) => (
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
    main={<FairSpeech acceptedTerms toggleTerms={() => setStep(3)} />}
    commands={
      <>
        <BackButton onClick={edit} />
        <NextButton loading={loading} onClick={post} inverse>
          yes, post
        </NextButton>
      </>
    }
    step={4}
    inverse
  />
);
