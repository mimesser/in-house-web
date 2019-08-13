import { put, call, select } from 'redux-saga/effects';
import Router from 'next/router';

import { waitTillReady } from '../../aggregate/saga';
import api from '../../../api';
import { loadVenuesDataSuccess, setSelectedVenue } from '../actions';
import { selectVenues } from '../selectors';
import { selectIndustriesMap } from '../../aggregate';

import { DEMO_VENUE } from '../../demo/data';

function* fetchVenueList() {
   const venues = yield select(selectVenues);
   if (venues) {
      return venues;
   }

   yield waitTillReady();
   const { data } = yield call(api.get, 'venues');
   const industries = yield select(selectIndustriesMap);

   const normalized = data.map((v, i) => ({
      ...v,
      industry: industries[v.industryId],
   }));

   yield put(loadVenuesDataSuccess(normalized));
   return normalized;
}

export function* initVenuesPage({ payload: { idToSelect } }) {
   const venues = yield fetchVenueList();
   if (!idToSelect) {
      return;
   }
   let venueToSelect;
   if (idToSelect === DEMO_VENUE.id) {
      venueToSelect = DEMO_VENUE;
   } else {
      venueToSelect = venues.find(v => v.id === +idToSelect);
   }
   if (venueToSelect) {
      yield put(setSelectedVenue(venueToSelect));
   } else {
      Router.push('/houses', '/houses', { shallow: true });
   }
}
