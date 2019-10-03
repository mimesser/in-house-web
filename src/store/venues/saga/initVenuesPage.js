import { put, call, select } from 'redux-saga/effects';
import Router from 'next/router';

import { waitTillReady } from '../../aggregate/saga';
import api, { setAuthorization } from '../../../api';
import { loadVenuesDataSuccess, setSelectedVenue } from '../actions';
import { selectVenues } from '../selectors';
import { selectIndustriesMap, selectAggregate, loadAggregateDataSuccess } from '../../aggregate';

import { turnDemoOn, turnDemoOff } from '../../demo';
import { DEMO_VENUE, DEMO_VENUES_ID } from '../../demo/data';

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

let alreadyInDemo = false;
let cacheAggregate;

export function* initVenuesPage({ payload: { idToSelect } }) {
  const inDemo = idToSelect === DEMO_VENUE.id || idToSelect === DEMO_VENUES_ID;
  if (inDemo) {
    if (idToSelect === DEMO_VENUES_ID) {
      alreadyInDemo = true;
      yield waitTillReady();
      cacheAggregate = yield select(selectAggregate);

      yield put(turnDemoOn());
    }

    if (!alreadyInDemo) {
      yield put(turnDemoOn());
    }
  } else {
    if (cacheAggregate) {
      yield put(loadAggregateDataSuccess(cacheAggregate));
      setAuthorization(cacheAggregate.userId);
    }

    yield put(turnDemoOff());
  }

  const venues = yield fetchVenueList();
  if (!idToSelect) {
    return;
  }

  let venueToSelect;
  if (inDemo) {
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
