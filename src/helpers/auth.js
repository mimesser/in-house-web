import { getState } from 'store';
import { get as getCookie } from 'helpers/cookie';

export function getToken() {
   const { user } = getState();

   /* eslint-disable no-underscore-dangle */
   if (user && user.id) {
      return user.id;
   }
   /* eslint-enable */

   const cookie = getCookie();

   if (cookie && cookie.token) {
      return cookie.token;
   }

   return null;
}
