/* eslint-disable no-unused-expressions */
import { injectGlobal } from 'styled-components';

import './reset.js';
import './fonts.js';

injectGlobal`
   body {
      margin: 0;
      letter-spacing: .1rem;
      font-family: "Avenir Light", sans-serif;
   }

   h1, h2, h3, h4, h5, h6 {
      text-align: center;
      margin: 0.5em;
   }

   button {
      border: none;
      outline: none;
      background: none;
      font: inherit;
   }
`;
