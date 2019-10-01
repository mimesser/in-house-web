import { createSelector } from 'reselect';

import { selectSelectedVenue } from '../venues';
import { DEMO_VENUE_ID } from './data';

export const selectInDemo = createSelector(
  selectSelectedVenue,
  selectedVenue => selectedVenue && selectedVenue.id === DEMO_VENUE_ID,
);
