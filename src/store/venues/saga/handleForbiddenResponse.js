import { clearInsiderVenue } from '../../aggregate';
import { showInsiderChallenge } from './showInsiderChallenge';

export function* handleForbiddenResponse(venueId) {
  yield put(clearInsiderVenue(venueId));
  yield showInsiderChallenge(venueId);
}
