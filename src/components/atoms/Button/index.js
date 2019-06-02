import React from 'react';
import styled, { css } from 'styled-components';

import { Loader } from '../Loader';

const StyledButton = styled.button`
   cursor: pointer;
   border-radius: 2em;
   border: 1px solid ${({ theme: { palette } }) => palette.black};
   background-color: ${({ secondary, inverse, theme: { palette } }) => (secondary || inverse ? palette.white : palette.black)};
   color: ${({ secondary, inverse, theme: { palette } }) => (secondary || inverse ? palette.black : palette.white)};
   // TODO: use predefined spacing, override in specific component if needed
   padding: 0.8rem 2.7rem;
   font-size: ${({ theme: { fontSize } }) => fontSize.medium};
   font-weight: 300;
   outline: none;

   ${({ secondary, inverse }) =>
      !secondary &&
      !inverse &&
      css`
         background-position: center;
         transition: background 0.8s;
         &:hover {
            background: #333 radial-gradient(circle, transparent 1%, #333 1%) center/15000%;
         }
         &:active {
            background-color: #666;
            background-size: 100%;
            transition: background 0s;
         }
      `}
`;

export const Button = styled(({ secondary, big, inverse, loading, children, ...props }) => {
   return (
      <StyledButton secondary={secondary} big={big} inverse={inverse} {...props}>
         {loading ? <Loader small white /> : children}
      </StyledButton>
   );
})``;
