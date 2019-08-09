import React from 'react';
import styled from 'styled-components';

import { Loader } from '../Loader';
import { withForwardedRef } from '../../withForwardedRef';
import { fontWeight, palette, fontSize, letterSpacing, spacing } from '../../../style';

const StyledButton = styled.button`
   cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
   border-radius: 2em;
   border: 1px solid ${palette.primaryLight};
   background-color: ${({ secondary, inverse }) => (secondary || inverse ? palette.white : palette.primaryLight)};
   color: ${({ secondary, inverse }) => (secondary || inverse ? palette.textDark : palette.white)};
   padding: ${spacing.large} ${spacing.xxLarge};
   font-size: ${fontSize.small};
   font-weight: ${fontWeight.bolder};
   letter-spacing: ${letterSpacing.primary};
   outline: none;
   text-decoration: none;
   text-align: center;
   ${({ disabled }) => disabled && `opacity: 0.5;`}
`;

export const Button = styled(
   withForwardedRef(({ secondary, big, inverse, loading, children, tag, ...props }) => (
      <StyledButton as={tag} secondary={secondary} big={big} inverse={inverse} {...props}>
         {loading ? <Loader small white /> : children}
      </StyledButton>
   )),
)``;

// TODO: active/focus etc
export const IconButton = styled.button`
   padding: 0;
   border: none;
   outline: none;
   cursor: pointer;
   color: currentColor;
   background: transparent;
`;
