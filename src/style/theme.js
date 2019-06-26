import { constColors, themeColors } from './colors';

export const theme = {
   colors: themeColors,
};

const fromTheme = key => ({ theme: { colors } }) => colors[key];

/**
 * Extracts theme color.
 * Usage `${palette.secondaryDark}`
 * Additionally supports const colors (white, black, transparent) - `${palette.transparent}`
 */
export const palette = Object.keys(themeColors).reduce(
   (p, key) => {
      p[key] = fromTheme(key);
      return p;
   },
   { ...constColors },
);
