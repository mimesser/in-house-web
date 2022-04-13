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
  sm: '812px',
  md: '896px',
  lg: '1024px',
  xl: '1280px',
};

export const mobileWidth = {
  xs: '320px',
  sm: '375px',
  md: '414px',
  lg: '768px',
  xl: '800px',
};

export const desktopWidth = {
  sm: '1280px',
  md: '1366px',
  lg: '1920px',
};

export const desktopHeight = {
  sm: '768px',
  md: '1024px',
  lg: '1080px',
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
  mobile2: `(min-width: ${mobileWidth.md})`,
  tab: `(min-width: ${mobileWidth.lg})`,
  tab2: `(min-width: ${mobileWidth.xl})`,
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
