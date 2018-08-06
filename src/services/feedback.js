import { api } from 'helpers';
import { get } from 'services/aggregate';

export async function createFeedback(body) {
   try {
      await api.post('feedback', body);
      await get();
      return null;
   } catch (err) {
      return err.data.message || 'An unexpected error has occured';
   }
}

export async function rateFeedback(feedbackId, rating) {
   try {
      await api.post(`feedback/${feedbackId}/rate`, { rating });
      await get();
      return null;
   } catch (err) {
      return err.data.message;
   }
}
