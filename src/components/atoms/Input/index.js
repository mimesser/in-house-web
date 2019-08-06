import React from 'react';
import styled, { css } from 'styled-components';

import { spacing, fontWeight, font, palette } from '../../../style';

const strikeThrough = ({ strike }) =>
   strike &&
   css`
      text-decoration: line-through;
   `;

const borderWidth = ({ error }) => (error ? 3 : 1);
const borderColor = ({ error }) => (error ? palette.primary : palette.secondary);

export const baseInputStyle = css`
   font-family: ${font.primary};
   display: block;
   width: 100%;
   margin: 0;
   box-sizing: border-box;
   font-size: 1rem;
   font-weight: ${fontWeight.primary};
   padding: ${spacing.medium};
   border: ${borderWidth}px solid ${borderColor};
   color: ${palette.textLight};
   transition: color 0.3s, border-color 0.3s;
   ${strikeThrough};
   ::placeholder {
      color: ${palette.textUltraLight};
   }
   :active:not(:disabled),
   :focus:not(:disabled) {
      color: ${palette.textDark};
      border-color: ${palette.primaryLight};
      outline: none;
   }
   :disabled {
      color: ${palette.secondaryLight};
      border-color: ${palette.secondaryLight};
   }
`;

export const Textarea = styled.textarea`
   ${baseInputStyle};
   resize: none;
`;

export const Input = styled.input`
   ${baseInputStyle}
`;
