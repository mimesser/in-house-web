import React from 'react';
import styled from 'styled-components';

import { palette, spacing, calcRem } from '../../../style';

const Steps = styled.div`
  display: flex;
  height: ${calcRem('6px')};

  > div {
    flex: 1;
    background: ${palette.white};
    :not(:last-child) {
      margin-right: ${spacing.xxs};
    }
    :nth-child(-n + ${({ step }) => step}) {
      background: ${palette.black};
    }
  }
`;

export const Progress = styled(({ step, totalSteps, className }) => (
  <Steps step={step} className={className}>
    {Array.from({ length: totalSteps }, (_, i) => (
      <div key={i} />
    ))}
  </Steps>
))``;
