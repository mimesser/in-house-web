import { calcRem } from './calcRem';

export const fontFamily = {
  light: 'HelveticaLTWXX-Light',
  primary: 'HelveticaLTWXX-Roman',
  bold: 'HelveticaLTWXX-Bold',
};

const useFamily = f => `
  font-family: ${f};
  font-weight: 300;
`;

export const font = {
  light: useFamily(fontFamily.light),
  primary: useFamily(fontFamily.primary),
  bold: useFamily(fontFamily.bold),
};

export const fontSize = {
  xs: calcRem('10px'),
  sm: calcRem('14px'),
  md: calcRem('18px'),
  lg: calcRem('32px'),
  xl: calcRem('72px'),
};

export const lineHeight = {
  sm: '1.2',
  md: '1.4',
  lg: '1.5',
};

// // Currently not in use - we have separate font family for each font weight :/
// export const fontWeight = {
//   light: 300,
//   normal: 400,
//   bold: 600,
// };

export const appLineHeight = lineHeight.sm;
export const appFontSize = fontSize.sm;
// export const appFontWeight = fontWeight.normal;
