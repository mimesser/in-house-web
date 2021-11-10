import React from 'react';
import styled, { css } from 'styled-components';

import { spacing, palette, fontSize, font } from '../../style';
import { Button, ClearButton, H1, Progress, Industry } from '../atoms';

const darkStyle = css`
  background-color: ${palette.primary};
  color: ${palette.white};
`;

export const Main = styled.div`
  ${({ inverse }) => inverse && darkStyle}
  padding: ${spacing.xxl};
  flex: 1;
  display: flex;
  flex-direction: column;

  ${Industry} {
    margin-bottom: ${spacing.xxxl};
  }
  ${H1} {
    margin-bottom: ${spacing.xxxl};
  }
  ${Progress} {
    margin-bottom: ${spacing.xl};
  }
`;

export const NextButton = styled(({ children = 'next', inverse, ...btnProps }) => (
  <Button {...btnProps} icon="arrow-right" inverse={inverse}>
    {children}
  </Button>
))`
  margin-left: auto;
`;

export const BackButton = styled(ClearButton).attrs(({ children = 'back' }) => ({ children }))`
  ${font.bold};
`;

export const Commands = styled.div`
  ${({ inverse }) => inverse && darkStyle}
  padding: ${spacing.xxl};
  display: flex;
  margin-top: auto;
`;

const renderHeader = (head) => {
  if (typeof head === 'string') {
    return <H1>{head}</H1>;
  }

  return head || null;
};

// TODO: render props instead?
export const StepLayout = ({ head, main, commands, step, hideProgress, totalSteps, inverse }) => (
  <>
    <Main inverse={inverse}>
      {renderHeader(head)}
      {!hideProgress && <Progress step={step} totalSteps={totalSteps} inverse={inverse} />}
      {main}
    </Main>
    <Commands inverse={inverse}>{commands}</Commands>
  </>
);

export const createStepLayout = (totalSteps) => (props) => (
  <StepLayout {...props} totalSteps={totalSteps} />
);
