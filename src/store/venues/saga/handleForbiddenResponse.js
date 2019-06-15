import { clearInsiderVenue } from '../../aggregate';
import { showInsiderChallenge } from './showInsiderChallenge';

export function* handleForbiddenResponse(venueId) {
   // TODO: test when UI allows changing top mink
   yield clearInsiderVenue(venueId);
   yield showInsiderChallenge(venueId);
}
