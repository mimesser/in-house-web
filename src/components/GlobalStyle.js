import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import { BASE_FONT_SIZE, breakpoints } from '../theme';
import { key, font } from '../utils';

const background = ({ theme: { appBackground } }) => appBackground;
// TODO: decide if key util is better than syntax above (no autocomplete, silent failure ...)
const color = key('textColors.primary');

const GlobalStyle = createGlobalStyle`
   ${normalize}
   * {
      box-sizing: border-box;
   }

   body {
      font-size: ${BASE_FONT_SIZE};
      font-family: ${font('primary')};
      font-weight: 300;
      color: ${color};
      background-color: ${background};
      min-width: ${breakpoints.xs};
   }

   h1,
   h2,
   h3,
   h4,
   h5,
   h6 {
      font-family: ${font('emphasis')};
      font-weight: normal;
   }
`;

export default GlobalStyle;
