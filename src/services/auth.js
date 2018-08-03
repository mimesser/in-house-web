import { api } from 'helpers';
import { setUser } from '../store/actions';

export async function login({ password, email }) {
   try {
      const { data: user } = await api.post('login', { password, email });
      /* eslint-disable-next-line no-underscore-dangle */
      setUser(user);
      return null;
   } catch (err) {
      console.log(err, err.status, err.message, err.response);
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
      console.log(err, err.status, err.message, err.response);
      return err.data.message;
   }
}

