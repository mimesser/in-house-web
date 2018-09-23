import { api } from 'helpers';
import { getVenue } from 'services/venue';

export async function createFeedback(body, venue) {
   try {
      await api.post('blabs', body);
      await getVenue(venue);
      return null;
   } catch (err) {
      return err.data.message || 'An unexpected error has occured';
   }
}

export async function rateFeedback(feedbackId, rating, venue) {
   try {
      await api.post(`blabs/${feedbackId}/vote/${rating}`);
      await getVenue(venue);
      return null;
   } catch (err) {
      return err.data.message;
   }
}
