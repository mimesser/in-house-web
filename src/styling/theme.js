/* eslint-disable no-use-before-define */
import { css } from 'styled-components';
import chroma from 'chroma-js';

// SECTION A (colors)
const A_1 = '#EBFAEC';
const A_2 = '#BDF3C2';
const A_3 = '#5E6F67';
const A_4 = '#424C48';
const A_5 = '#232D30';
const A_6 = '#171E21';
const A_7 = '#121618';
const A_8 = '#020202';

// P (PARAGRAPH)
const P1 = css`
   font-family: "Avenir Light", sans-serif;
   font-size: 10pt;
   color: ${A_3};
`;
const P2 = css`
   font-family: "Avenir Light", sans-serif;
   font-size: 10pt;
   color: ${A_2};
`;
const P3 = css`
   font-family: "Avenir Light", sans-serif;
   font-size: 10pt;
   color: ${A_4};
`;
const P4 = css`
   font-family: "Avenir Light", sans-serif;
   font-size: 10pt;
   color: ${A_1};
`;

// SECTION B (transparencies)
const B_1 = css`
   background-color: ${chroma(A_1).alpha(0.5).css()};
`;
const B_2 = css`
   background-color: ${chroma(A_2).alpha(0.5).css()};
`;
const B_3 = css`
   background-color: ${chroma(A_3).alpha(0.5).css()};
`;
const B_4 = css`
   background-color: ${chroma(A_4).alpha(0.5).css()};
`;
const B_5 = css`
   background-color: ${chroma(A_5).alpha(0.5).css()};
`;
const B_6 = css`
   background-color: ${chroma(A_6).alpha(0.9).css()};
`;
const B_7 = css`
   background-color: ${chroma(A_7).alpha(0.5).css()};
`;

// SECTION C (lines)
const C_1 = css`
   border: 1px solid ${A_5};
`;
const C_2 = css`
   border: 1px solid ${A_4};
`;
const C_3 = css`
   border: 1px solid ${A_3};
`;
const C_4 = css`
   border: 2px solid ${A_2};
`;

// SECTION D (svg logo – Avenir Light font)

// SECTION E (text fields)
const E_1 = css`
   ${B_4};
   /* color: ${A_5}; */
   ${P3};
   ::placeholder {
      ${P1}
   }
   :hover, :active {
      ${B_3};
      ${P2};
   }
   :not([value='']) {
      ${A_5};
      ${P2};
   }
   ${props => props.error && css`
      ${C_4};
      border-width: 0;
      border-left-width: 1px;
   `}
`;

// SECTION F (search fields)
const F_1 = css`
   ${A_5};
   text-align: center;
   ::placeholder {
      ${P1}
   }
   :not([value='']) {
      ${B_3};
      ${P2};
      text-align: left;
   }
`;
const F_2 = css`
   :not([value='']) {
      ${B_3}
      ${P2}
   }
`;

// SECTION G (dropdown menu)

// SECTION H (headers/footer)

// SECTION I (buttons)
const I_1 = css`
   ${B_3};
   ${P2};
   text-transform: uppercase;
   :hover {
      ${B_2};
      ${P4};
   }
   .previously-rated {
      ${B_5};
      ${P1};
   }
`;
const I_2 = css`
   ${B_3};
   ${P2};
   :hover {
      ${B_2};
      ${P4};
   }
`;
const I_3 = css`
   ${B_3};
   ${P2};
   :hover {
      ${B_2};
      ${P4};
   }
   :disabled {
      ${B_5};
      ${P4};
   }
`;

// SECTION J (links)

// SECTION K (outline buttons)

// SECTION M (modal windows)

// SECTION N (pop ups)
const N_1 = css`
   ${B_6};
   color: ${chroma(A_2).alpha(0.5).hex()};
`;

// SECTION N (alert pop-up)

// SECTION P (venue photo gradient)

// SECTION T (menus)

// SECTION W (icons)

/* ----------------------------------------- */

// H (HEADER TAGS)
const H1 = css`
   font-family: "Helvetica Neue Light", sans-serif;
   font-size: 20pt;
   color: ${A_2};
`;
const H2 = css`
   font-family: "Avenir Light", sans-serif;
   font-size: 10pt;
   color: ${A_2};
`;

// S (SMALL)
const S1 = css`
   font-family: "Avenir Light", sans-serif;
   font-size: 8pt;
   color: ${A_3};
`;
const S2 = css`
   font-family: "Avenir Light", sans-serif;
   font-size: 8pt;
   color: ${A_2};
`;
const S3 = css`
   font-family: "Avenir Light", sans-serif;
   font-size: 8pt;
   color: ${A_4};
`;
const S4 = css`
   font-family: "Avenir Light", sans-serif;
   font-size: 8pt;
   color: ${A_1};
`;

// T (TITLE)
const T1 = css`
   color: ${A_3};
`;
const T2 = css`
   color: ${A_2};
`;
const T3 = css`
   color: ${A_4};
`;
const T4 = css`
   color: ${A_1};
`;

// C (CATEGORIES)

// M (MINKS)

// V (VENUE)
const V1 = css`
   font-family: "Helvetica Neue Light", sans-serif;
   font-size: 20pt;
   color: ${A_3};
`;
const V2 = css`
   font-family: "Helvetica Neue Light", sans-serif;
   font-size: 20pt;
   color: ${A_2};
`;
const V3 = css`
   font-family: "Helvetica Neue Light", sans-serif;
   font-size: 20pt;
   color: ${A_4};
`;
const V4 = css`
   font-family: "Helvetica Neue Light", sans-serif;
   font-size: 20pt;
   color: ${A_1};
`;

// N (NUMBERS)

// L (LANDING)
const L1 = css`
   font-family: "Avenir Neue Ultra Light", sans-serif;
   font-size: 16pt;
   color: ${A_3};
`;
const L2 = css`
   font-family: "Avenir Neue Ultra Light", sans-serif;
   font-size: 16pt;
   color: ${A_1};
`;
const L3 = css`
   font-family: "Avenir Neue Ultra Light", sans-serif;
   font-size: 24pt;
   color: ${A_3};
   text-align: center;
`;
const L4 = css`
   font-family: "Avenir Roman", sans-serif;
   font-size: 32pt;
   color: ${A_2};
   text-align: center;
`;
const L5 = css`
   font-family: "Avenir Roman", sans-serif;
   font-size: 44pt;
   color: ${A_2};
   text-align: center;
`;

/* eslint-disable object-property-newline */
export default {
   A_1, A_2, A_3, A_4, A_5, A_6, A_7, A_8,
   B_1, B_2, B_3, B_4, B_5, B_6, B_7,
   C_1, C_2, C_3, C_4,
   E_1,
   F_1, F_2,
   I_1, I_2, I_3,
   H1, H2,
   N_1,
   S1, S2, S3, S4,
   P1, P2, P3, P4,
   T1, T2, T3, T4,
   V1, V2, V3, V4,
   L1, L2, L3, L4, L5,
};
