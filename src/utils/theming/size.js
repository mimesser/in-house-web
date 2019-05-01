import { key } from './key';

/**
 * Shorthand to `key(['sizes', path])`
 */
export const size = (path, defaultValue) => key(['sizes', path], defaultValue);
