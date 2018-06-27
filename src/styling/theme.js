import { css } from 'styled-components';
import chroma from 'chroma-js';

// SECTION A (colors)
const A_1 = '#ff0000';
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
   padding: 8px 12px;
   background-color: ${A_5};
   &::placeholder {
      ${P1}
   }
   background-color: ${A_5};
   ${P2};
   &:hover, &:active {
      ${B_3};
      ${P2};
   }
   ${props => props.error && css`
      ${C_4};
      border-width: 0;
      border-left-width: 2px;
   `}
   &:disabled {
      background-color: ${A_5};
      ${P2};
   }
`;

// SECTION F (search fields)
const F_1 = css`
   input {
      background-color: ${A_5};
      text-align: center;
      padding: 14px 18px;
      ${P1};
      &::placeholder {
         ${P1}
      }
      &:focus {
         text-align: left;
      }
      &:not([value='']) {
         ${B_3};
         ${P2};
         text-align: left;
         & ~ i {
            color: ${A_2};
         }
      }
   }
   i {
      color: ${A_3};
   }
`;
const F_2 = css`
   input {
      padding: 8px 12px;
      ${P2}
      &:focus {
         background-color: ${A_5};
         & ~ i {
            color: ${A_3};
         }
      }
      &:not([value='']) {
         ${B_3}
         & ~ i {
            color: ${A_2};
         }
      }
   }
   i {
      color: ${A_4};
   }
`;

// SECTION G (dropdown menu)
const G_1 = css`
   ${P1}
   background-color: ${A_6};
   border: 1px solid transparent;
   i {
      color: ${chroma(A_3).alpha(0.5).css()};
   }
   &:hover {
      ${P2}
      i {
         color: ${chroma(A_2).alpha(0.5).css()};
      }
   }
   ${props => props.open && css`
      ${C_3}
      ${P2}
      background-color: ${A_6};
      i {
         color: ${chroma(A_2).alpha(0.5).css()};
      }
      li {
         text-align: right;
         &:hover {
            ${P4}
            ${B_3}
         }
      }
   `}
   ${props => props.disabled && css`
      ${C_1}
      ${P2}
      i {
         color: ${chroma(A_2).alpha(0.5).css()};
      }
   `}
`;
// SECTION H (headers/footer)
const H_3 = css`
   ${P1}
   &:hover {
      ${P2}
   }
`;
// SECTION I (buttons)
const I_1 = css`
   ${B_3};
   ${P2};
   height: 34px;
   padding: 0 12px;
   min-width: 70px;
   :hover {
      ${B_2};
      ${P4};
   }
   ${props => props.previouslyRated && css`
      ${B_5};
      ${P1};
   `}
`;
const I_2 = css`
   ${B_3};
   ${P2};
   height: 64px;
   padding: 0 40px;
   :hover {
      ${B_2};
      ${P4};
   }
`;
const I_3 = css`
   ${B_3};
   ${P2};
   padding: 0 16px;
   height: 48px;
   :hover {
      ${B_2};
      ${P4};
   }
   :disabled {
      ${B_5};
      ${P4};
   }
`;
const I_4 = css`
   i {
      color: ${chroma(A_3).alpha(0.5).css()};
   }
   ${props => props.prevSelected && css`
      i {
         color: ${chroma(A_4).alpha(0.5).css()};
      }
   `}
   ${props => props.unselected && css`
      i {
         color: ${chroma(A_5).alpha(0.5).css()};
      }
   `}
   &:hover i {
      color: ${chroma(A_1).alpha(0.5).css()};
   }
`;

// SECTION J (links)
const J_1 = css`
   &:hover {
      ${P4}
   }
   ${P2};
   ${props => props.selected && css`
      ${P4};
   `}
   ${props => props.inactive && css`
      ${P3};
   `}
`;
const J_2 = css`
   &:hover {
      ${S4}
   }
   ${S2};
   ${props => props.selected && css`
      ${S4};
   `}
   ${props => props.inactive && css`
      ${S3};
   `}
`;

// SECTION M (modal windows)

// SECTION N (pop ups)
const N_1 = css`
   ${B_6};
   color: ${chroma(A_2).alpha(0.5).hex()};
`;

// SECTION N (alert pop-up)

// SECTION P (venue photo gradient)

// T (TITLE)
const T1 = css`
   font-family: "Avenir Light", sans-serif;
   font-size: 12pt;
   color: ${A_3};
`;
const T2 = css`
   font-family: "Avenir Light", sans-serif;
   font-size: 12pt;
   color: ${A_2};
`;
const T3 = css`
   font-family: "Avenir Light", sans-serif;
   font-size: 12pt;
   color: ${A_4};
`;
const T4 = css`
   font-family: "Avenir Light", sans-serif;
   font-size: 12pt;
   color: ${A_1};
`;

// SECTION T (menus)
const T_3 = css`
   text-transform: uppercase;
   ${P1}
   &:hover {
      ${P4}
   }
   ${props => props.selected && css`
      ${P2}
   `}
`;
const T_4 = css`
   padding: 16px;
   ${C_1};
   ${P1};
   &:hover {
      ${P4};
   }
   ${props => props.selected && css`
      ${C_4};
      ${P2};
   `}
   border-width: 0;
   border-bottom-width: 2px;
`;
const T_5 = css`
   padding: 4px;
   ${C_1};
   ${S1};
   &:hover {
      ${S4};
   }
   ${props => props.selected && css`
      ${C_4};
      ${S2};
   `}
   border-width: 0;
   border-bottom-width: 2px;
`;
const T_6 = css`
   ${C_2};
   ${S1};
   &:hover {
      ${S2};
      ${C_3};
   }
   border-width: 0;
   border-bottom-width: 2px;
`;
const T_7 = css`
   ${C_2};
   ${P1};
   &:hover {
      ${T2};
      ${C_3};
   }
   border-width: 0;
   border-bottom-width: 2px;
`;
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

// SECTION K (outline buttons)
const K_1 = css`
   ${S1};
   border: 1px solid transparent;
   padding: 20px 8px;
   &:hover {
      ${S2};
      ${C_2};
   }
`;


// C (CATEGORIES)
const C1 = css`
   font-family: "Helvetica Neue Light", sans-serif;
   font-size: 10pt;
   color: ${A_3};
`;
const C2 = css`
   font-family: "Helvetica Neue Light", sans-serif;
   font-size: 10pt;
   color: ${A_2};
`;
const C3 = css`
   font-family: "Helvetica Neue Light", sans-serif;
   font-size: 10pt;
   color: ${A_4};
`;
const C4 = css`
   font-family: "Helvetica Neue Light", sans-serif;
   font-size: 10pt;
   color: ${A_1};
`;

// M (MINKS)
const M1 = css`
   font-family: "Helvetica Neue Light", sans-serif;
   font-size: 12pt;
   color: ${A_3};
`;
const M2 = css`
   font-family: "Helvetica Neue Light", sans-serif;
   font-size: 12pt;
   color: ${A_2};
`;
const M3 = css`
   font-family: "Helvetica Neue Light", sans-serif;
   font-size: 12pt;
   color: ${A_4};
`;
const M4 = css`
   font-family: "Helvetica Neue Light", sans-serif;
   font-size: 12pt;
   color: ${A_1};
`;

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
const N1 = css`
   font-family: "Avenir Light", sans-serif;
   font-size: 16pt;
   color: ${A_3};
`;
const N2 = css`
   font-family: "Avenir Light", sans-serif;
   font-size: 16pt;
   color: ${A_2};
`;
const N3 = css`
   font-family: "Avenir Light", sans-serif;
   font-size: 24pt;
   color: ${A_2};
`;
const N4 = css`
   font-family: "Avenir Light", sans-serif;
   font-size: 24pt;
   color: ${A_1};
`;
const N7 = css`
   font-family: "Avenir Light", sans-serif;
   font-size: 54pt;
   color: ${A_2};
`;
const N8 = css`
   font-family: "Avenir Light", sans-serif;
   font-size: 54pt;
   color: ${A_1};
`;

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
`;
const L4 = css`
   font-family: "Avenir Roman", sans-serif;
   font-size: 32pt;
   color: ${A_2};
`;
const L5 = css`
   font-family: "Avenir Roman", sans-serif;
   font-size: 44pt;
   color: ${A_2};
`;

// W (icons)
// const W_2 = css`
//    &:hover i { color: ${A_4}; }
//    i { color: ${A_3}; }
// `;
// const W_3 = css`
//    &:hover i { color: ${A_4}; }
//    i { color: ${A_3}; }
// `;
// const W_4 = css`
//    &:hover i { color: ${A_4}; }
//    i { color: ${A_3}; }
// `;
// const W_5 = css`
//    ${props => (props.active ? css`
//       i { color: ${A_3}; }
//    ` : css`
//       i { color: ${A_5}; }
//    `)}
// `;
// const W_6 = css`
//    &:hover i { color: ${A_4}; }
//    i { color: ${A_3}; }
// `;
// const W_7 = css`
//    &:hover i { color: ${A_4}; }
//    i { color: ${A_3}; }
// `;

/* eslint-disable object-property-newline */
export default {
   A_1, A_2, A_3, A_4, A_5, A_6, A_7, A_8,
   B_1, B_2, B_3, B_4, B_5, B_6, B_7,
   C_1, C_2, C_3, C_4,
   E_1,
   F_1, F_2,
   G_1,
   I_1, I_2, I_3, I_4,
   H1, H2,
   H_3,
   J_1, J_2,
   K_1,
   N_1,
   S1, S2, S3, S4,
   C1, C2, C3, C4,
   M1, M2, M3, M4,
   P1, P2, P3, P4,
   T1, T2, T3, T4,
   N1, N2, N3, N4, N7, N8,
   V1, V2, V3, V4,
   L1, L2, L3, L4, L5,
   T_3, T_4, T_5, T_6, T_7,
};
