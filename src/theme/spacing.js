import { calcRem } from './helper/calcRem';

export const spacing = {
   none: '0',
   tiny: calcRem('4px'),
   small: calcRem('8px'),
   medium: calcRem('16px'),
   large: calcRem('24px'),
};
