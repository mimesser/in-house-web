/* global document */
import { each } from 'utils';

/**
 * Gets the latest cookie as an object.  Null otherwise.
 *
 * @export
 * @returns cookie
 */
export function get() {
   if (document.cookie) {
      const list = document.cookie.split(';');
      return list.map(i => i.trim().split(/=(.+)/)).reduce((obj, item) => ({ ...obj, [item[0]]: item[1] }), {});
   }
   return null;
}

/**
 * Sets the cookie.
 *
 * @export
 * @param {object} cookie
 */
export function set(cookie) {
   each(cookie, (value, key) => {
      document.cookie = `${key} = ${value}`;
   });
}

export default {
   set, get,
};
