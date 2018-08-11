import { api } from 'helpers';
import { get } from 'services/aggregate';

export async function applyAsOwner(body) {
   try {
      await api.post('owner/apply', body);
      await get();
      return null;
   } catch (err) {
      return err.data.message || 'an unexpected error has occured';
   }
}
