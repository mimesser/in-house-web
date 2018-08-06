import { api } from 'helpers';
import { get } from 'services/aggregate';

export async function createVenue(body) {
   try {
      await api.post('venues', body);
      await get();
      return null;
   } catch (err) {
      return err.data.message;
   }
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

export async function applyAsOwner(body) {
   try {
      await api.post('notify/apply-as-owner', body);
      await get();
      return null;
   } catch (err) {
      return err.data.message;
   }
}

export async function rateCategory({ venueId, categoryId, rating }) {
   try {
      await api.post(`venues/${venueId}/rate-category`, { categoryId, rating });
      await get();
      return null;
   } catch (err) {
      return err.data.message;
   }
}
