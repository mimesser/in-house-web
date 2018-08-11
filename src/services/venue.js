import { api } from 'helpers';
import { get } from 'services/aggregate';
import { setVenue } from 'store/actions';

export async function createVenue(body) {
   try {
      await api.post('venues', body);
      await get();
      return null;
   } catch (err) {
      return err.data.message;
   }
}

export async function getVenue(venue) {
   const { id, timestamp } = venue;
   const { data: newVenue } = await api.get(`venues/${id}`, { params: { timestamp } });
   setVenue(newVenue);
}

export async function suggestEdit(body) {
   try {
      await api.post('notify/suggest-edit', body);
      await get();
      return null;
   } catch (err) {
      return err.data.message;
   }
}
