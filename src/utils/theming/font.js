import { key } from './key';

/**
 * Shorthand to `key(['fonts', path])`
 */
export const font = (path, defaultValue) => key(['fonts', path], defaultValue);
