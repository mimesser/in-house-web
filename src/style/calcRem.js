import { rem } from 'polished';

export const BASE_FONT_SIZE = '16px';
export const calcRem = pxVal => rem(pxVal, BASE_FONT_SIZE);
