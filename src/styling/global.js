/* eslint-disable no-unused-expressions */
import { injectGlobal } from 'styled-components';

import theme from './theme';
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
   .I_1 {
      ${theme.I_1}
   }
   .I_2 {
      ${theme.I_2}
   }
   .I_3 {
      ${theme.I_3}
   }

   .H1 {
      ${theme.H1}
   }
   .H2 {
      ${theme.H2}
   }

   .P1 {
      ${theme.P1}
   }
   .P2 {
      ${theme.P2}
   }
   .P3 {
      ${theme.P3}
   }
   .P4 {
      ${theme.P4}
   }

   .T1 {
      ${theme.T1}
   }
   .T2 {
      ${theme.T2}
   }
   .T3 {
      ${theme.T3}
   }
   .T4 {
      ${theme.T4}
   }

   .L1 {
      ${theme.L1}
   }
   .L2 {
      ${theme.L2}
   }
   .L3 {
      ${theme.L3}
   }
   .L4 {
      ${theme.L4}
   }
   .L5 {
      ${theme.L5}
   }
`;
