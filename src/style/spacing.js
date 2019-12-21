import { calcRem } from './calcRem';

export const spacing = {
  none: '0',
  xxs: calcRem('2px'),
  xs: calcRem('4px'),
  sm: calcRem('8px'),
  md: calcRem('12px'),
  lg: calcRem('16px'),
  xl: calcRem('24px'),
  xxl: calcRem('32px'),
  xxxl: calcRem('40px'),
};
