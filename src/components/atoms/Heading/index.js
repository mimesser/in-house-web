import React from 'react';
import styled, { css } from 'styled-components';
import { spacing } from '../../../theme';

const baseStyle = css`
   margin-bottom: ${props => props.noMargin && '0'};
   color: ${({ theme }) => theme.textColors.emphasis};
   margin-top: 0;
   text-align: ${props => {
      if (props.center) return 'center';
      if (props.right) return 'right';
      return 'left';
   }};

   max-width: 100%;
`;

export const Heading = styled.h1`
   ${baseStyle};
   font-size: 2rem;
   margin-bottom: ${({ noMargin }) => (noMargin ? 0 : spacing.large)};
`;

// TODO: fix below sizing/spacing

export const HeadingTwo = styled.h2`
   font-size: 36px;
   margin-bottom: 20px;
   ${baseStyle};
`;

export const HeadingThree = styled.h3`
   font-size: 28px;
   margin-bottom: 15px;
   ${baseStyle};
`;

export const HeadingFour = styled.h4`
   font-size: 22px;
   margin-bottom: 10px;
   ${baseStyle};
`;

export const HeadingFive = styled.h5`
   font-size: 18px;
   margin-bottom: 5px;
   ${baseStyle};
`;
