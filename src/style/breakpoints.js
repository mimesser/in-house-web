import { css } from 'styled-components';

export const breakpoints = {
  xs: '375px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

export const mobileHeight = {
  xs: '667px',
  sm: '736px',
  md: '812px',
  lg: '1024px',
  xl: '1366px',
};

export const mobileWidth = {
  xs: '320px',
  sm: '375px',
  md: '414px',
  lg: '768px',
  xl: '1024px',
};
const desktopWidth = {
  sm: '1024px',
  md: '1440px',
  lg: '1920px',
};

export const device = {
  iPhone8: `
  (min-width: ${mobileWidth.sm})
  and (min-height: ${mobileHeight.xs})
  and (-webkit-device-pixel-ratio : 2)
  and (orientation : portrait)
  `,
  iPhone8Plus: `
  (min-width: ${mobileWidth.md})
  and (min-height: ${mobileHeight.sm})
  and (-webkit-device-pixel-ratio : 3)
  and (orientation : portrait)
  `,
  iPhoneX: `
  (min-width: ${mobileWidth.sm})
  and (min-height: ${mobileHeight.md})
  and (-webkit-device-pixel-ratio : 3)
  and (orientation : portrait)
  `,
  iPad: `
  (min-width: ${mobileWidth.lg})
  and (min-height: ${mobileHeight.sm})
  and (-webkit-device-pixel-ratio : 2)
  and (orientation : portrait)
  `,
  mobile: `(min-width: ${mobileWidth.sm})`,
  tab: `(min-width: ${mobileWidth.lg})`,
  web: `(min-width: ${desktopWidth.sm})`,
  laptop: `(min-width: ${desktopWidth.md})`,
  desktop: `(min-width: ${desktopWidth.lg})`,
  macbook: `
  (min-width: ${desktopWidth.md})
  and (-webkit-device-pixel-ratio : 2)
  `,
};

export const onDesktop = (style) => css`
  @media screen and (min-width: ${breakpoints.lg}) {
    ${style};
  }
`;

export const onDesktopOverflowAuto = css`
  @media screen and (min-width: ${breakpoints.lg}) {
    overflow: auto;
  }
`;
