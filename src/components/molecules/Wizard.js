import React from 'react';
import styled from 'styled-components';

import { spacing, palette, fontSize, font } from '../../style';
import { Button, ClearButton, H1, Progress } from '../atoms';

export const Main = styled.div`
  padding: ${spacing.xxl};
  flex: 1;
  display: flex;
  flex-direction: column;

  ${H1} {
    margin-bottom: ${spacing.xxxl};
  }
  ${Progress} {
    margin-bottom: ${spacing.xl};
  }
`;

export const NextButton = styled(({ children = 'next', ...btnProps }) => (
  <Button {...btnProps} icon="arrow-right">
    {children}
  </Button>
))`
  margin-left: auto;
`;

export const BackButton = styled(ClearButton).attrs(({ children = 'back' }) => ({ children }))`
  ${font.bold};
`;

export const Commands = styled.div`
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
export const StepLayout = ({ head, main, commands, step, hideProgress, totalSteps }) => (
  <>
    <Main>
      {renderHeader(head)}
      {!hideProgress && <Progress step={step} totalSteps={totalSteps} />}
      {main}
    </Main>
    <Commands>{commands}</Commands>
  </>
);

export const createStepLayout = (totalSteps) => (props) => <StepLayout {...props} totalSteps={totalSteps} />;
