import React from 'react';
import styled, { css } from 'styled-components';

import { spacing, fontWeight, font, palette } from '../../../style';

const styles = css`
   font-family: ${font.primary};
   display: block;
   width: 100%;
   margin: 0;
   box-sizing: border-box;
   font-size: 1rem;
   font-weight: ${fontWeight.bolder};
   padding: ${spacing.small};
   color: ${palette.textDark};
   box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.08);
   border: 1px solid ${({ invalid }) => (invalid ? palette.primaryDark : 'transparent')};
   border-radius: 3px;
   :active,
   :focus {
      border: 1px solid ${({ invalid }) => (invalid ? palette.primaryDark : palette.secondaryDark)};
      outline: none;
   }
   ::placeholder {
      color: ${palette.textLight};
      font-weight: ${fontWeight.primary};
   }
`;

export const Textarea = styled.textarea`
   ${styles};
   resize: none;
`;

export const Select = styled.select`
   ${styles}
`;

export const Input = styled.input`
   ${styles}
`;
