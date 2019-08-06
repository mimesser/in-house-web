import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';

import {
   BASE_FONT_SIZE,
   breakpoints,
   lineHeight,
   fontWeight,
   font,
   appBackground,
   palette,
   letterSpacing,
} from '../style';

const GlobalStyle = createGlobalStyle`
   ${normalize()}
   * {
      box-sizing: border-box;
   }

   body {
      font-size: ${BASE_FONT_SIZE};
      font-family: ${font.primary};
      font-weight: ${fontWeight.primary};
      letter-spacing: ${letterSpacing.primary};
      line-height: ${lineHeight.small};
      color: ${palette.text};
      background-color: ${appBackground};
      min-width: ${breakpoints.xs};
   }

   h1,
   h2,
   h3,
   h4,
   h5,
   h6 {
      font-family: ${font.heading};
      font-weight: ${fontWeight.bold};
      color: ${palette.textDark};
      letter-spacing: ${letterSpacing.large};
   }
`;

export default GlobalStyle;
