import { api } from 'helpers';
import { getVenue } from 'services/venue';

export async function submitAnswer(minkId, answer) {
   try {
      await api.post(`ipqs/answer/${minkId}`, { answer });
      return null;
   } catch (err) {
      return err.data;
   }
}

export async function rateMink(minkId, rating, venue) {
   try {
      await api.post(`ipqs/${minkId}/rate`, { rating });
      await getVenue(venue);
      return null;
   } catch (err) {
      return err.data.message;
   }
}

export async function getTopMink(venueId) {
   try {
      const { data } = await api.get(`ipqs/top/${venueId}`);
      return data;
   } catch (err) {
      return null;
   }
}

export async function createMink(body, venue) {
   try {
      await api.post('ipqs', body);
      await getVenue(venue);
      return null;
   } catch (err) {
      return err.data.message || 'An unexpected error has occured';
   }
}
