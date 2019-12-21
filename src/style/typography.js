import { calcRem } from './calcRem';

export const font = {
  primary: 'Helvetica, Roboto, Arial, sans-serif',
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

// TODO: fix once font supplied
export const fontWeight = {
  light: 300,
  normal: 400,
  bold: 600,
};

export const appLineHeight = lineHeight.sm;
export const appFontSize = fontSize.sm;
export const appFontWeight = fontWeight.normal;
