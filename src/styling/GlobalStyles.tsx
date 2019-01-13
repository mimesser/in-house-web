import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
   @font-face {
      font-family: 'Roboto', sans-serif;
      src: url('https://fonts.googleapis.com/css?family=Roboto');
      font-weight: normal;
      font-style: normal;
   }
   html, body, #root {
      height: 100%;
   }
   div {
      box-sizing: border-box;
   }
   body {
      font-family: 'Roboto', sans-serif;
      margin: 0;
      background-color: rgb(239, 241, 248);
   }
   input {
      box-sizing: border-box;
   }
`;
