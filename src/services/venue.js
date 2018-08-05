import { api } from 'helpers';
import { get } from 'services/aggregate';

export async function createVenue(body) {
   try {
      await api.post('venues', body);
      await get();
      return null;
   } catch (err) {
      console.log(err, err.status, err.message, err.response, err.data);
      return err.data.message;
   }
}

export async function suggestEdit(body) {
   try {
      await api.post('notify/suggest-edit', body);
      await get();
      return null;
   } catch (err) {
      console.log(err, err.status, err.message, err.response, err.data);
      return err.data.message;
   }
}

export async function applyAsOwner(body) {
   try {
      await api.post('notify/apply-as-owner', body);
      await get();
      return null;
   } catch (err) {
      console.log(err, err.status, err.message, err.response, err.data);
      return err.data.message;
   }
}
