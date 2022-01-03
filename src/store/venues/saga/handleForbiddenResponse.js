import { clearInsiderVenue } from '../../aggregate';
import { showInsiderChallenge } from './showInsiderChallenge';

/**
 * @description
 * This Redux Saga function helps to handle the forbidden response from the API.
 * @param {string} venueId is the id of the Venue.
 *
 * @return Nothing
 */
export function* handleForbiddenResponse(venueId) {
  yield put(clearInsiderVenue(venueId));
  yield showInsiderChallenge(venueId);
}
