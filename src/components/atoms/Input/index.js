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
   font-weight: ${fontWeight.primary};
   padding: ${spacing.medium};
   color: ${palette.text};
   box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.08);
   border: 1px solid ${({ invalid }) => (invalid ? palette.primaryDark : 'transparent')};
   border-radius: 3px;
   &[type='checkbox'],
   &[type='radio'] {
      display: inline-block;
      border: 0;
      border-radius: 0;
      width: auto;
      height: auto;
      margin: 0 0.2rem 0 0;
   }
   :active,
   :focus {
      border: 1px solid ${({ invalid }) => (invalid ? palette.primaryDark : palette.secondaryDark)};
      outline: none;
   }
   ::placeholder {
      color: ${palette.textLight};
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

export const Checkbox = styled.input.attrs({
   type: 'checkbox',
})`
   ${styles}
`;
