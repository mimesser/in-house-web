import React from 'react';
import styled, { css } from 'styled-components';
import { Close } from 'styled-icons/material/Close';

import { breakpoints, spacing, palette, appBackground } from '../../../style';
import { Heading, HeadingTwo, IconButton } from '../../atoms';

export const Background = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: rgba(0, 0, 0, 0.5);
   visibility: ${props => (props.open ? `visible` : `hidden`)};
   opacity: ${props => (props.open ? `1` : `0`)};
   transition: 0.5s;
   z-index: 1;
`;

export const Layout = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   display: flex;
   justify-content: center;
`;

const colors = ({ inverse }) =>
   inverse
      ? css`
           background-color: ${palette.primary};
           color: ${palette.white};
           ${Heading}, ${HeadingTwo} {
              color: ${palette.white};
           }
        `
      : `background-color: ${appBackground};`;

export const Content = styled.div`
   position: relative;
   overflow: auto;
   display: flex;
   flex-direction: column;
   min-width: ${breakpoints.xs};
   max-width: ${breakpoints.sm};
   width: 100%;
   padding: ${spacing.xxLarge} ${spacing.large} ${spacing.large} ${spacing.large};

   ${colors};
`;

const CloseIcon = styled(Close).attrs({ size: 27 })``;

export const CloseButton = styled(IconButton).attrs({
   children: <CloseIcon />,
})`
   cursor: pointer;
   color: ${({ inverse }) => inverse && palette.white};
   position: absolute;
   top: ${spacing.large};
   right: ${spacing.large};
`;
