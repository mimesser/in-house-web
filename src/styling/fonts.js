/* eslint-disable no-unused-expressions */
import { injectGlobal } from 'styled-components';

import f1 from 'assets/fonts/Helvetica-Neue-Light.otf';
import f2 from 'assets/fonts/NunitoSans-Light.ttf';
import f3 from 'assets/fonts/NunitoSans-ExtraLight.ttf';
import f4 from 'assets/fonts/NunitoSans-Regular.ttf';

injectGlobal`
   @font-face {
      font-family: 'Helvetica Neue Light';
      src: url(${f1}) format('opentype');
      font-weight: normal;
      font-style: normal;
   }

   @font-face {
      font-family: 'Avenir Light';
      src: url(${f2}) format('truetype');
      font-weight: normal;
      font-style: normal;
   }

   @font-face {
      font-family: 'Avenir Neue Ultra Light';
      src: url(${f3}) format('truetype');
      font-style: normal;
      font-weight: normal;
   }

   @font-face {
      font-family: 'Avenir Roman';
      src: url(${f4}) format('truetype');
      font-style: normal;
      font-weight: 300;
   }
`;
