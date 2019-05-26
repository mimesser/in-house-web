import { key } from './key';

/**
 * Shorthand to `key(['breakpoints', path])`
 */
export const breakpoints = (path, defaultValue) => key(['breakpoints', path], defaultValue);
