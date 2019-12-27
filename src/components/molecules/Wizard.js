import React from 'react';
import styled from 'styled-components';

import { spacing, palette, fontSize, fontWeight } from '../../style';
import { Button, resetButtonStyles, H1, Icon, Progress } from '../atoms';

const Main = styled.div`
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
  <Button {...btnProps}>
    {children}
    <Icon icon="arrow-right" />
  </Button>
))`
  margin-left: auto;
`;

export const BackButton = styled.button.attrs(({ children = 'back' }) => ({ children }))`
  ${resetButtonStyles};
  font-weight: ${fontWeight.bold};
`;

const Commands = styled.div`
  padding: ${spacing.lg} ${spacing.xxl};
  display: flex;
  margin-top: auto;
`;

export const FormTip = styled.div`
  margin: ${spacing.xs} 0 ${spacing.xl};
  color: ${palette.lightGray};
  font-size: ${fontSize.xs};
`;

const renderHeader = head => {
  if (typeof head === 'string') {
    return <H1>{head}</H1>;
  }

  return head || null;
};

// TODO: render props instead?
export const StepLayout = ({ head, main, commands, step, totalSteps }) => (
  <>
    <Main>
      {renderHeader(head)}
      <Progress step={step} totalSteps={totalSteps} />
      {main}
    </Main>
    <Commands>{commands}</Commands>
  </>
);

export const createStepLayout = totalSteps => props => <StepLayout {...props} totalSteps={totalSteps} />;
