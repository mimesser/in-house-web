import { reversePalette } from './helper/reversePalette';
import { breakpoints } from './breakpoints';
import { calcRem } from './helper/calcRem';

// TODO: fix according to style guide
const palette = {
   primary: ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb'],
   secondary: ['#c2185b', '#e91e63', '#f06292', '#f8bbd0'],
   danger: ['#d32f2f', '#f44336', '#f8877f', '#ffcdd2'],
   alert: ['#ffa000', '#ffc107', '#ffd761', '#ffecb3'],
   success: ['#388e3c', '#4caf50', '#7cc47f', '#c8e6c9'],
   grayscale: ['#212121', '#414141', '#616161', '#9e9e9e', '#bdbdbd', '#e0e0e0', '#eeeeee', '#ffffff'],
   white: '#FFFFFF',
   black: '#000000',
};

const textColors = {
   primary: '#4A4A4A',
   emphasis: '#152935',
};

const fonts = {
   primary: `Roboto, sans-serif`,
   emphasis: `Poppins, sans-serif`,
   pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
   quote: 'Georgia, serif',
};

const fontSize = {
   primary: '1rem',
   small: calcRem('12px'),
   medium: calcRem('18px'),
};

export const theme = {
   palette,
   // TODO: what is it good for?
   reversePalette: reversePalette(palette),
   fonts,
   // TODO: shouldn't be here (not themeable anyway)
   breakpoints,
   appBackground: '#FAFAFA',
   textColors,
   fontSize,
};
