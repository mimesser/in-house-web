/* eslint-disable no-unused-expressions */
import { injectGlobal } from 'styled-components';

injectGlobal`
   @font-face {
      font-family: 'Helvetica Neue Light';
      src: url(../../assets/fonts/Helvetica-Neue-Light.otf) format('opentype');
      font-weight: normal;
      font-style: normal;
   }

   @font-face {
      font-family: 'Avenir Light';
      src: url(../../assets/fonts/NunitoSans-Regular.ttf) format('truetype');
      font-weight: normal;
      font-style: normal;
   }

   @font-face {
      font-family: 'Avenir Neue Ultra Light';
      src: url(../../assets/fonts/NunitoSans-Light.ttf) format('truetype');
      font-style: normal;
      font-weight: normal;
   }

   @font-face {
      font-family: 'Avenir Roman';
      src: url(../../assets/fonts/NunitoSans-Bold.ttf) format('truetype');
      font-style: normal;
      font-weight: 300;
   }
`;
