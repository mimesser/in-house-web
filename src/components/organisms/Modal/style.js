import React from 'react';
import styled, { css } from 'styled-components';

import { breakpoints, spacing, palette, appBackground } from '../../../style';
import { Heading, HeadingTwo, IconButton, Icon } from '../../atoms';

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
           color: ${palette.textUltraLight};
           ${Heading}, ${HeadingTwo} {
              color: ${palette.textUltraLight};
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
   padding: ${spacing.xLarge};

   ${colors};
`;

export const CloseButton = styled(IconButton).attrs({
   children: <Icon icon="close" />,
})`
   margin-left: auto;
`;

export const ModalHeader = styled.header`
   display: flex;
   align-items: center;
   text-transform: uppercase;
`;
