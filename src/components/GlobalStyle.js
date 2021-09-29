import React from 'react';
import { createGlobalStyle, css } from 'styled-components';
import { normalize } from 'polished';

import { breakpoints, BASE_FONT_SIZE, appFontSize, font, appLineHeight, appBackground, palette } from '../style';

/* @import url('//hello.myfonts.net/count/3af918'); */
const fontFamilies = css`
  @font-face {
    font-family: 'HelveticaLTWXX-Light';
    font-display: swap;
    src: url('https://in-house.azureedge.net/webstatic/fonts/3AF918_0_0.eot');
    src: url('https://in-house.azureedge.net/webstatic/fonts/3AF918_0_0.eot?#iefix') format('embedded-opentype'),
      url('https://in-house.azureedge.net/webstatic/fonts/3AF918_0_0.woff2') format('woff2'),
      url('https://in-house.azureedge.net/webstatic/fonts/3AF918_0_0.woff') format('woff'),
      url('https://in-house.azureedge.net/webstatic/fonts/3AF918_0_0.ttf') format('truetype');
  }

  @font-face {
    font-family: 'HelveticaLTWXX-Roman';
    font-display: swap;
    src: url('https://in-house.azureedge.net/webstatic/fonts/3AF918_1_0.eot');
    src: url('https://in-house.azureedge.net/webstatic/fonts/3AF918_1_0.eot?#iefix') format('embedded-opentype'),
      url('https://in-house.azureedge.net/webstatic/fonts/3AF918_1_0.woff2') format('woff2'),
      url('https://in-house.azureedge.net/webstatic/fonts/3AF918_1_0.woff') format('woff'),
      url('https://in-house.azureedge.net/webstatic/fonts/3AF918_1_0.ttf') format('truetype');
  }

  @font-face {
    font-family: 'HelveticaLTWXX-Bold';
    font-display: swap;
    src: url('https://in-house.azureedge.net/webstatic/fonts/3AF918_2_0.eot');
    src: url('https://in-house.azureedge.net/webstatic/fonts/3AF918_2_0.eot?#iefix') format('embedded-opentype'),
      url('https://in-house.azureedge.net/webstatic/fonts/3AF918_2_0.woff2') format('woff2'),
      url('https://in-house.azureedge.net/webstatic/fonts/3AF918_2_0.woff') format('woff'),
      url('https://in-house.azureedge.net/webstatic/fonts/3AF918_2_0.ttf') format('truetype');
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${fontFamilies};
  ${normalize()};
  * {
    box-sizing: border-box;
  }

  html, body {
    height: 100%;

  }

  input, textarea {
    border-radius: 0;
  }
  body {
    text-transform: lowercase;
    font-size: ${BASE_FONT_SIZE};
    ${font.primary};
    line-height: ${appLineHeight};
    color: ${palette.text};
    background-color: ${appBackground};
    min-width: ${breakpoints.xs};
    min-height: 650px;
    height: 100%;
    word-break: break-word;

    > * {
      font-size: ${appFontSize};
    }

    > div:first-child {
      height: 100%;
    }
  }

  a {
    color: currentColor;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  b, strong {
    ${font.bold};
  }
`;
