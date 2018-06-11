/* eslint-disable no-unused-expressions */
import { injectGlobal } from 'styled-components';

import theme from './theme';
import './reset.js';
import './fonts.js';

injectGlobal`
   body {
      margin: 0;
      letter-spacing: .1rem;
      font-family: "Avenir Roman",sans-serif;
      /* "Avenir Light", sans-serif; */
   }

   span, div, h1, h2, h3, h4, h5, h6 {
      line-height: 1.4em;
   }

   h1, h2, h3, h4, h5, h6 {
      margin: 0.5em 0;
   }

   button {
      border: none;
      outline: none;
      background: none;
      font: inherit;
      text-transform: uppercase;
      cursor: pointer;
   }
`;

// inject classes from theme
injectGlobal`
   .I-1 {
      ${theme.I_1}
   }
   .I-2 {
      ${theme.I_2}
   }
   .I-3 {
      ${theme.I_3}
   }

   .H1 {
      ${theme.H1}
   }
   .H2 {
      ${theme.H2}
   }

   .S1 {
      ${theme.P1}
   }
   .S2 {
      ${theme.P2}
   }
   .S3 {
      ${theme.P3}
   }
   .S4 {
      ${theme.P4}
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

   .V1 {
      ${theme.V1}
   }
   .V2 {
      ${theme.V2}
   }
   .V3 {
      ${theme.V3}
   }
   .V4 {
      ${theme.V4}
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
