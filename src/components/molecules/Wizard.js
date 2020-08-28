import React from 'react';
import styled, { css } from 'styled-components';

import { spacing, palette, fontSize, font } from '../../style';
import { Button, ClearButton, H1, Progress } from '../atoms';

const darkModeStyle = css`
  background-color: ${palette.primary};
  color: ${palette.white};
`;

export const Main = styled.div`
  ${({ darkMode }) => darkMode && darkModeStyle}
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

export const NextButton = styled(({ children = 'next', darkMode, ...btnProps }) => (
  <Button {...btnProps} icon="arrow-right" darkMode={darkMode}>
    {children}
  </Button>
))`
  margin-left: auto;
`;

export const BackButton = styled(ClearButton).attrs(({ children = 'back' }) => ({ children }))`
  ${font.bold};
`;

export const Commands = styled.div`
  ${({ darkMode }) => darkMode && darkModeStyle}
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
export const StepLayout = ({ head, main, commands, step, hideProgress, totalSteps, darkMode }) => (
  <>
    <Main darkMode={darkMode}>
      {renderHeader(head)}
      {!hideProgress && <Progress step={step} totalSteps={totalSteps} darkMode={darkMode}/>}
      {main}
    </Main>
    <Commands darkMode={darkMode}>{commands}</Commands>
  </>
);

export const createStepLayout = (totalSteps) => (props) => <StepLayout {...props} totalSteps={totalSteps} />;
