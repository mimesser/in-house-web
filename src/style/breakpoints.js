import { css } from 'styled-components';

export const breakpoints = {
  xs: '375px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

export const onDesktop = style => css`
  @media screen and (min-width: ${breakpoints.lg}) {
    ${style};
  }
`;

export const onDesktopOverflowAuto = css`
  @media screen and (min-width: ${breakpoints.lg}) {
    overflow: auto;
  }
`;
