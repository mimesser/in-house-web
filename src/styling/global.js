/* eslint-disable no-unused-expressions */
import { injectGlobal } from 'styled-components';

import './reset';
import './fonts';

injectGlobal`
   body {
      margin: 0;
      letter-spacing: .1rem;
      font-family: "Avenir Roman", sans-serif;
   }

   input {
      background: inherit;
      outline: none;
      border: none;
      font: inherit;
   }

   button {
      border: none;
      outline: none;
      background: none;
      font: inherit;
      text-transform: uppercase;
      cursor: pointer;
   }

   a {
      text-decoration: none;
      font: inherit;
      color: inherit;
   }
`;
