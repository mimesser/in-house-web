import { api, cookie } from 'helpers';
import { update } from 'store/actions';
import { getState } from 'store';

export async function get() {
   const timestamp = getState().timestamp || null;
   try {
      const { data } = await api.get('aggregate', { params: { timestamp } });
      /* eslint-disable-next-line no-underscore-dangle */
      if (data.user) {
         cookie.set({ token: data.user.id });
      }
      update(data);
   } catch (err) {
      if (process.env.NODE_ENV === 'development') {
         update({});
      } else {
         throw err;
      }
   }
}
