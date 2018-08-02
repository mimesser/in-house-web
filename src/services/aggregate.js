import { api, cookie } from 'helpers';
import { update } from 'store/actions';
import { getState } from 'store';

export async function get() {
   const timeStamp = getState().timeStamp || null;
   const { data } = await api.get('aggregate', { params: { timeStamp } });
   /* eslint-disable-next-line no-underscore-dangle */
   cookie.set({ token: data.user._id });
   update(data);
}
