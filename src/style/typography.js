import { calcRem } from './calcRem';

export const lineHeight = {
   small: '1.2',
   medium: '1.4',
   large: '1.5',
};

export const font = {
   primary: 'Source Sans Pro, sans-serif',
   number: 'Roboto, sans-serif',
   heading: 'Nunito Sans, sans-serif',
};

export const fontSize = {
   tiny: calcRem('12px'),
   small: calcRem('14px'),
   primary: '1rem',
   medium: calcRem('18px'),
   large: calcRem('24px'),
   xLarge: calcRem('32px'),
};

export const fontWeight = {
   primary: 300,
   bolder: 400,
   bold: 600,
};

export const letterSpacing = {
   primary: calcRem('0.5px'),
   large: calcRem('2px'),
};
