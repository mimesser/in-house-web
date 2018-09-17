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
      await api.post(`mink/${minkId}/rate`, { rating });
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
      console.log(err.data);
      return null;
   }
}

export async function createMink(body, venue) {
   try {
      await api.post('mink', body);
      await getVenue(venue);
      return null;
   } catch (err) {
      return err.data.message || 'An unexpected error has occured';
   }
}
