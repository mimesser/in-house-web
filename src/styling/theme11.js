/* eslint-disable no-use-before-define */
import { css } from 'styled-components';

const theme = {
   // SECTION A (colors)
   A_1: '#EBFAEC',
   A_2: '#BDF3C2',
   A_3: '#5E6F67',
   A_4: '#424C48',
   A_5: '#232D30',
   A_6: '#171E21',
   A_7: '#121618',
   A_8: '#020202',

   // SECTION B (transparencies)
   B_1: css`
      background-color: rgba(${theme.A_1}, 0.5);
   `,
   B_2: css`
      background-color: rgba(${theme.A_2}, 0.5);
   `,
   B_3: css`
      background-color: rgba(${theme.A_3}, 0.5);
   `,
   B_4: css`
      background-color: rgba(${theme.A_4}, 0.5);
   `,
   B_5: css`
      background-color: rgba(${theme.A_5}, 0.5);
   `,
   B_6: css`
      background-color: rgba(${theme.A_6}, 0.9);
   `,
   B_7: css`
      background-color: rgba(${theme.A_7}, 0.5);
   `,

   // SECTION C (lines)
   C_1: css`
      border: 1px solid ${theme.A_5};
   `,
   C_2: css`
      border: 1px solid ${theme.A_4};
   `,
   C_3: css`
      border: 1px solid ${theme.A_3};
   `,
   C_4: css`
      border: 2px solid ${theme.A_2};
   `,

   // SECTION D (svg logo – Avenir Light font)

   // SECTION E (text fields)
   E_1: css`
      color: ${theme.A_5};
      ::placeholder {
         ${theme.P1};
      }
      :hover, :active {
         ${theme.B_3};
         ${theme.P2};
      }
      :not([value='']) {
         ${theme.A_5};
         ${theme.P2};
      }
      :invalid {
         ${theme.C_4};
         border-width: 0;
         border-left-width: 1px;
      }
   `,

   // SECTION F (search fields)
   F_1: css`
      ${theme.A_5};
      text-align: center;
      ::placeholder {
         ${theme.P1};
      }
      :not([value='']) {
         ${theme.B_3};
         ${theme.P2};
         text-align: left;
      }
   `,
   F_2: css`
      :not([value='']) {
         ${theme.B_3};
         ${theme.P2};
      }
   `,

   // SECTION G (dropdown menu)

   // SECTION H (headers/footer)

   // SECTION I (buttons)
   I_1: css`
      ${theme.B_3};
      ${theme.P2};
      text-transform: uppercase;
      :hover {
         ${theme.B_2};
         ${theme.P4};
      }
      .previously-rated {
         ${theme.B_5};
         ${theme.P1};
      }
   `,
   I_2: css`
      ${theme.B_3};
      ${theme.P2};
      :hover {
         ${theme.B_2};
         ${theme.P4};
      }
   `,
   I_3: css`
      ${theme.B_3};
      ${theme.P2};
      :hover {
         ${theme.B_2};
         ${theme.P4};
      }
      :disabled {
         ${theme.B_5};
         ${theme.P4};
      }
   `,

   // SECTION J (links)

   // SECTION K (outline buttons)

   // SECTION M (modal windows)

   // SECTION N (pop ups)

   // SECTION N (alert pop-up)

   // SECTION P (venue photo gradient)

   // SECTION T (menus)

   // SECTION W (icons)

   /* ----------------------------------------- */

   // H (HEADER TAGS)
   H1: css`
      font-family: "Helvetica Neue Light", sans-serif;
      font-size: 20pt;
      color: ${theme.A_2};
   `,
   H2: css`
      font-family: "Avenir Light", sans-serif;
      font-size: 10pt;
      color: ${theme.A_2};
   `,

   // S (SMALL)

   // P (PARAGRAPH)
   P1: css`
      font-family: "Avenir Light", sans-serif;
      font-size: 10pt;
      color: ${theme.A_3};
   `,
   P2: css`
      font-family: "Avenir Light", sans-serif;
      font-size: 10pt;
      color: ${theme.A_2};
   `,
   P3: css`
      font-family: "Avenir Light", sans-serif;
      font-size: 10pt;
      color: ${theme.A_4};
   `,
   P4: css`
      font-family: "Avenir Light", sans-serif;
      font-size: 10pt;
      color: ${theme.A_1};
   `,

   // T (TITLE)
   T1: css`
      color: ${theme.A_3};
   `,
   T2: css`
      color: ${theme.A_2};
   `,
   T3: css`
      color: ${theme.A_4};
   `,
   T4: css`
      color: ${theme.A_1};
   `,

   // C (CATEGORIES)

   // M (MINKS)

   // V (VENUE)

   // N (NUMBERS)

   // L (LANDING)
   L1: css`
      font-family: "Avenir Neue Ultra Light", sans-serif;
      font-size: 16pt;
      color: ${theme.A_3};
   `,
   L2: css`
      font-family: "Avenir Neue Ultra Light", sans-serif;
      font-size: 16pt;
      color: ${theme.A_1};
   `,
   L3: css`
      font-family: "Avenir Neue Ultra Light", sans-serif;
      font-size: 24pt;
      color: ${theme.A_3};
   `,
   L4: css`
      font-family: "Avenir Roman", sans-serif;
      font-size: 32pt;
      color: ${theme.A_2};
   `,
   L5: css`
      font-family: "Avenir Roman", sans-serif;
      font-size: 44pt;
      color: ${theme.A_2};
   `,
};

export default theme;
