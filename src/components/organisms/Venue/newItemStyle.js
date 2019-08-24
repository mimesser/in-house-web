import React from 'react';
import styled from 'styled-components';

import { calcRem, spacing, palette, panelBoxShadow, fontSize } from '../../../style';
import { Button, Heading } from '../../atoms';

export const Main = styled.div`
  padding: ${spacing.large};

  ${Heading} {
    margin-bottom: ${spacing.xLarge};
  }
`;

export const Name = styled.div`
  text-transform: uppercase;
  color: ${palette.textDark};
  margin-bottom: ${spacing.medium};
`;

export const Commands = styled.div`
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
    width: ${({ step }) => step * 25}%;
  }
`;

export const Tip = styled.div`
  margin: ${spacing.tiny} 0 ${spacing.xLarge};
  color: ${palette.textLight};
  font-size: ${fontSize.tiny};
`;

export const Title = ({ houseName, action }) => (
  <>
    <Name>{houseName}</Name>
    <Heading>{action}</Heading>
  </>
);

export const StepLayout = ({ main, commands, step }) => (
  <>
    <Main>{main}</Main>
    <Commands step={step}>{commands}</Commands>
  </>
);
