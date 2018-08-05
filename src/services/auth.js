import { api } from 'helpers';
import { get } from 'services/aggregate';
import { setUser } from '../store/actions';

export async function login({ password, email }) {
   try {
      const { data: user } = await api.post('login', { password, email });
      /* eslint-disable-next-line no-underscore-dangle */
      setUser(user);
      return null;
   } catch (err) {
      return err.data.message;
   }
}

export async function signup({ password, email }) {
   try {
      const { data: user } = await api.post('signup', { password, email });
      /* eslint-disable-next-line no-underscore-dangle */
      setUser(user);
      return null;
   } catch (err) {
      return err.data.message;
   }
}

export async function editEmail({ password, email }) {
   try {
      await api.post('profile/email', { password, email });
      /* eslint-disable-next-line no-underscore-dangle */
      await get();
      return null;
   } catch (err) {
      return err.data.message;
   }
}

export async function editPassword({ currentPassword, newPassword }) {
   try {
      await api.post('profile/password', { currentPassword, newPassword });
      /* eslint-disable-next-line no-underscore-dangle */
      await get();
      return null;
   } catch (err) {
      return err.data.message;
   }
}
