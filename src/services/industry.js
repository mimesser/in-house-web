import { api } from 'helpers';
import { get } from 'services/aggregate';

export async function createIndustry(body) {
   try {
      await api.post('industry', body);
      await get();
      return null;
   } catch (err) {
      return err.data.message || 'An unexpected error has occured';
   }
}
