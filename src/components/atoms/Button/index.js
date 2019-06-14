import React from 'react';
import styled from 'styled-components';

import { Loader } from '../Loader';
import { fontWeight } from '../../../theme';

const StyledButton = styled.button`
   cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
   border-radius: 2em;
   border: 1px solid ${({ theme: { palette } }) => palette.black};
   background-color: ${({ secondary, inverse, theme: { palette } }) =>
      secondary || inverse ? palette.white : palette.black};
   color: ${({ secondary, inverse, theme: { palette } }) => (secondary || inverse ? palette.black : palette.white)};
   // TODO: use predefined spacing, override in specific component if needed
   padding: 0.8rem 2.7rem;
   font-size: ${({ theme: { fontSize } }) => fontSize.medium};
   font-weight: ${fontWeight.primary};
   outline: none;
   ${({ disabled }) => disabled && `opacity: 0.5;`}
`;

export const Button = styled(({ secondary, big, inverse, loading, children, ...props }) => {
   return (
      <StyledButton secondary={secondary} big={big} inverse={inverse} {...props}>
         {loading ? <Loader small white /> : children}
      </StyledButton>
   );
})``;

// TODO: active/focus etc
export const IconButton = styled.button`
   padding: 0;
   border: none;
   outline: none;
   cursor: pointer;
   color: currentColor;
   background: transparent;
`;
