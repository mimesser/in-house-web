import { api } from 'helpers';
import { get } from 'services/aggregate';
import { getVenue } from 'services/venue';

export async function createCategory(body) {
   try {
      await api.post('category', body);
      await get();
      return null;
   } catch (err) {
      return err.data.message || 'An unexpected error has occured';
   }
}

export async function rateCategory({ venue, categoryId, rating }) {
   try {
      await api.post(`categories/${categoryId}/rate`, { venueId: venue.id, rating });
      await getVenue(venue);
      return null;
   } catch (err) {
      return err.data.message;
   }
}
