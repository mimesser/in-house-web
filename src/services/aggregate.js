import { api, cookie } from 'helpers';
import { update } from 'store/actions';
import { getState } from 'store';

export async function get() {
   const timestamp = getState().timestamp || null;
   const { data } = await api.get('aggregate', { params: { timestamp } });
   /* eslint-disable-next-line no-underscore-dangle */
   cookie.set({ token: data.user.id });
   update(data);
}
