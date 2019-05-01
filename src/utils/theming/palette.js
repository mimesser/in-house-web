import { key } from './key';

/**
 * Returns the value of `props.theme[palette || reversePalette][path][index]` or
 * `styledTheme[palette || reversePalette][path][index]` (default theme)
 */
export const palette = (...args) => (props = {}) => {
   const exceptions = args.find(arg => typeof arg === 'object') || {};
   const path = args.find(arg => typeof arg === 'string') || props.palette;
   const defaultValue = [...args].reverse().find(arg => typeof arg === 'string');
   let index = args.find(arg => typeof arg === 'number');
   let reverse = args.find(arg => typeof arg === 'boolean');
   reverse = reverse ? !props.reverse : props.reverse;

   if (typeof index === 'undefined') {
      throw new Error('[palette] You must pass index');
   }
   if (typeof path === 'undefined') {
      throw new Error('[palette] You must pass palette path');
   }

   if (Object.keys(exceptions).indexOf(path) >= 0) {
      index = exceptions[path];
   }

   const palettePath = reverse ? 'reversePalette' : 'palette';
   return key([palettePath, path, index], defaultValue !== path && defaultValue)(props);
};
