import React from 'react';
import styled from 'styled-components';

import { palette, spacing, calcRem } from '../../../style';

const Steps = styled.div`
  display: flex;
  height: ${calcRem('6px')};

  > div {
    flex: 1;
    background-color: ${({ darkMode }) => darkMode ? palette.mediumGray : palette.white};
    :not(:last-child) {
      margin-right: ${spacing.xxs};
    }
    :nth-child(-n + ${({ step }) => step}) {
      background-color: ${({ darkMode }) => darkMode ? palette.white : palette.black};
    }
  }
`;

export const Progress = styled(({ step, totalSteps, className, darkMode }) => (
  <Steps step={step} className={className} darkMode={darkMode}>
    {Array.from({ length: totalSteps }, (_, i) => (
      <div key={i} />
    ))}
  </Steps>
))``;
