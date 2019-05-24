import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
   ${normalize}
   * {
      box-sizing: border-box;
   }

   body {
      font-size: 16px;
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
   }

   h1,
   h2,
   h3,
   h4,
   h5,
   h6 {
      font-family: 'Poppins', sans-serif;
      font-weight: normal;
   }
`;

export default GlobalStyle;
