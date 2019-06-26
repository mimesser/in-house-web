import { calcRem } from './calcRem';

export const spacing = {
   none: '0',
   tiny: calcRem('4px'),
   small: calcRem('8px'),
   medium: calcRem('12px'),
   large: calcRem('16px'),
   xLarge: calcRem('24px'),
   xxLarge: calcRem('32px'),
};
