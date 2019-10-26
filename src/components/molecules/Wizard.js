import React from 'react';
import styled from 'styled-components';

import { calcRem, spacing, palette, panelBoxShadow, fontSize } from '../../style';
import { Button, Heading } from '../atoms';

const Main = styled.div`
  padding: ${spacing.large};
  flex: 1;
  display: flex;
  flex-direction: column;

  ${Heading} {
    margin-bottom: ${spacing.xLarge};
  }
`;

const Commands = styled.div`
  position: relative;
  padding: ${spacing.large} 0;
  display: flex;
  justify-content: space-around;
  margin-top: auto;
  background-color: ${palette.white};
  border-top: 1px solid ${palette.secondary};
  ${panelBoxShadow};

  ${Button} {
    width: 40%;
    margin: 0 ${spacing.small};
  }

  // progress bar
  :before {
    position: absolute;
    top: ${calcRem('-3.5px')};
    left: 0;
    content: '';
    height: ${calcRem('2px')};
    background-color: ${palette.text};
    width: ${({ step, totalSteps }) => (step * 100) / totalSteps}%;
  }
`;

export const FormTip = styled.div`
  margin: ${spacing.tiny} 0 ${spacing.xLarge};
  color: ${palette.textLight};
  font-size: ${fontSize.tiny};
`;

// TODO: remove default for total steps
// TODO: render props instead?
export const StepLayout = ({ main, commands, step, totalSteps = 4 }) => (
  <>
    <Main>{main}</Main>
    <Commands step={step} totalSteps={totalSteps}>
      {commands}
    </Commands>
  </>
);

export const createStepLayout = totalSteps => props => <StepLayout {...props} totalSteps={totalSteps} />;
