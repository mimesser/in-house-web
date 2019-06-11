import { calcRem } from './helper/calcRem';

export const spacing = {
   none: '0',
   tiny: calcRem('4px'),
   small: calcRem('8px'),
   input: calcRem('12px'),
   medium: calcRem('16px'),
   large: calcRem('24px'),
   xLarge: calcRem('32px'),
};
