import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';

import {
  breakpoints,
  BASE_FONT_SIZE,
  appFontSize,
  appFontWeight,
  appLineHeight,
  font,
  appBackground,
  palette,
} from '../style';

export const GlobalStyle = createGlobalStyle`
   ${normalize()}
   * {
      box-sizing: border-box;
   }

   html, body {
      height: 100%;
   }

   body {
      font-size: ${BASE_FONT_SIZE};
      font-family: ${font.primary};
      font-weight: ${appFontWeight};
      line-height: ${appLineHeight};
      color: ${palette.text};
      background-color: ${appBackground};
      min-width: ${breakpoints.xs};
      word-break: break-word;

      > * {
        font-size: ${appFontSize};
      }

      > div:first-child {
        height: 100%;
      }
   }

   a {
     color: currentColor;
   }

   h1, h2, h3, h4, h5, h6 {
     margin: 0;
   }
`;
