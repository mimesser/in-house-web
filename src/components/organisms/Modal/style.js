import styled from 'styled-components';
import { Close as CloseIcon } from 'styled-icons/material/Close';

import { breakpoints } from '../../../theme';
import { Heading } from '../../atoms';

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

export const Content = styled.div`
   position: relative;
   overflow: auto;

   display: flex;
   background-color: ${({ theme: { palette } }) => palette.black};
   color: ${({ theme: { palette } }) => palette.white};
   ${Heading} {
      color: ${({ theme: { palette } }) => palette.white};
   }
   min-width: ${breakpoints.xs};
   max-width: ${breakpoints.sm};
   width: 100%;
`;

// TODO: button
export const Close = styled(CloseIcon).attrs({ size: `2rem` })`
   position: absolute;
   top: 1rem;
   right: 1rem;
   cursor: pointer;
   color: white;
`;
