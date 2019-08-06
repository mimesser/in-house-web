export const constColors = {
   white: '#fff',
   black: '#000',
   transparent: 'transparent',
};

export const appColors = {
   ...constColors,

   // TODO: any better name?
   dim: '#002633',
   dimDark: '#00000c',
   dimLight: '#2e4e5d',

   gray: '#d6dddf',
   grayDark: '#a5abad',
   grayLight: '#f1f4f4',
   grayExtraLight: '#fafafa',
};

export const themeColors = {
   primary: appColors.dim,
   primaryDark: appColors.dimDark,
   primaryLight: appColors.dimLight,

   secondary: appColors.gray,
   secondaryDark: appColors.grayDark,
   secondaryLight: appColors.grayLight,

   text: appColors.dimLight,
   textUltraLight: appColors.gray,
   textLight: appColors.grayDark,
   textDark: appColors.dim,
   textInverse: constColors.white,
};
