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
      background-color: rgba(${this.A_1}, 0.5);
   `,
   B_2: css`
      background-color: rgba(${this.A_2}, 0.5);
   `,
   B_3: css`
      background-color: rgba(${this.A_3}, 0.5);
   `,
   B_4: css`
      background-color: rgba(${this.A_4}, 0.5);
   `,
   B_5: css`
      background-color: rgba(${this.A_5}, 0.5);
   `,
   B_6: css`
      background-color: rgba(${this.A_6}, 0.9);
   `,
   B_7: css`
      background-color: rgba(${this.A_7}, 0.5);
   `,

   // SECTION C (lines)
   C_1: css`
      border: 1px solid ${this.A_5};
   `,
   C_2: css`
      border: 1px solid ${this.A_4};
   `,
   C_3: css`
      border: 1px solid ${this.A_3};
   `,
   C_4: css`
      border: 2px solid ${this.A_2};
   `,

   // SECTION D (svg logo – Avenir Light font)

   // SECTION E (text fields)
   E_1: css`
      color: ${this.A_5};
      ::placeholder {
         ${this.P1};
      }
      :hover, :active {
         ${this.B_3};
         ${this.P2};
      }
      :not([value='']) {
         ${this.A_5};
         ${this.P2};
      }
      :invalid {
         ${this.C_4};
         border-width: 0;
         border-left-width: 1px;
      }
   `,

   // SECTION F (search fields)
   F_1: css`
      ${this.A_5};
      text-align: center;
      ::placeholder {
         ${this.P1};
      }
      :not([value='']) {
         ${this.B_3};
         ${this.P2};
         text-align: left;
      }
   `,
   F_2: css`
      :not([value='']) {
         ${this.B_3};
         ${this.P2};
      }
   `,

   // SECTION G (dropdown menu)

   // SECTION H (headers/footer)

   // SECTION I (buttons)
   I_1: css`
      ${this.B_3};
      ${this.P2};
      text-transform: uppercase;
      :hover {
         ${this.B_2};
         ${this.P4};
      }
      .previously-rated {
         ${this.B_5};
         ${this.P1};
      }
   `,
   I_2: css`
      ${this.B_3};
      ${this.P2};
      :hover {
         ${this.B_2};
         ${this.P4};
      }
   `,
   I_3: css`
      ${this.B_3};
      ${this.P2};
      :hover {
         ${this.B_2};
         ${this.P4};
      }
      :disabled {
         ${this.B_5};
         ${this.P4};
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
      color: ${this.A_2};
   `,
   H2: css`
      font-family: "Avenir Light", sans-serif;
      font-size: 10pt;
      color: ${this.A_2};
   `,

   // S (SMALL)

   // P (PARAGRAPH)
   P1: css`
      font-family: "Avenir Light", sans-serif;
      font-size: 10pt;
      color: ${this.A_3};
   `,
   P2: css`
      font-family: "Avenir Light", sans-serif;
      font-size: 10pt;
      color: ${this.A_2};
   `,
   P3: css`
      font-family: "Avenir Light", sans-serif;
      font-size: 10pt;
      color: ${this.A_4};
   `,
   P4: css`
      font-family: "Avenir Light", sans-serif;
      font-size: 10pt;
      color: ${this.A_1};
   `,

   // T (TITLE)
   T1: css`
      color: ${this.A_3};
   `,
   T2: css`
      color: ${this.A_2};
   `,
   T3: css`
      color: ${this.A_4};
   `,
   T4: css`
      color: ${this.A_1};
   `,

   // C (CATEGORIES)

   // M (MINKS)

   // V (VENUE)

   // N (NUMBERS)

   // L (LANDING)
   L1: css`
      font-family: "Avenir Neue Ultra Light", sans-serif;
      font-size: 16pt;
      color: ${this.A_3};
   `,
   L2: css`
      font-family: "Avenir Neue Ultra Light", sans-serif;
      font-size: 16pt;
      color: ${this.A_1};
   `,
   L3: css`
      font-family: "Avenir Neue Ultra Light", sans-serif;
      font-size: 24pt;
      color: ${this.A_3};
   `,
   L4: css`
      font-family: "Avenir Roman", sans-serif;
      font-size: 32pt;
      color: ${this.A_2};
   `,
   L5: css`
      font-family: "Avenir Roman", sans-serif;
      font-size: 44pt;
      color: ${this.A_2};
   `,
};

export default theme;
