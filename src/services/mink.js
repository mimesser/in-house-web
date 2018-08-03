import { api } from 'helpers';
import { get } from 'services/aggregate';

export async function submitAnswer(minkId, answer) {
   try {
      await api.post(`mink/${minkId}`, { answer });
      await get();
      return null;
   } catch (err) {
      return err.data.message;
   }
}
