/**
 * Returns object with reverse order array
 */
export const reversePalette = palette =>
   Object.keys(palette).reduce(
      (newPalette, key) => ({
         ...newPalette,
         [key]: [...palette[key]].reverse(),
      }),
      {},
   );
