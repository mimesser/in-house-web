import { css } from 'styled-components';

export const breakpoints = {
  xs: '375px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

const size = {
  mobileS: '562px',
  mobileM: '621px',
  mobileL: '768px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

const heights = {
  mobileXS: '667px',
  mobileSM: '1218px',
  mobileMD: '1104px',
  mobileLG: '1204px',
};

export const device = {
  mobileS: `(min-width: ${size.mobileS}) and (min-height: ${heights.mobileSM})`,
  mobileM: `(min-width: ${size.mobileM}) and (min-height: ${heights.mobileMD})`,
  mobileL: `(min-width: ${size.mobileL}) and (min-height: ${heights.mobileLG})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
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
