import { put, call, select } from 'redux-saga/effects';
import Router from 'next/router';

import { waitTillReady } from '../../aggregate/saga';
import api, { setAuthorization } from '../../../api';
import { loadVenuesDataSuccess, setSelectedVenue, loadPollsDataSuccess } from '../actions';
import { selectVenues, selectPolls } from '../selectors';
import { selectIndustriesMap, selectAggregate, loadAggregateDataSuccess } from '../../aggregate';

import { turnDemoOn, turnDemoOff } from '../../demo';
import { DEMO_VENUE, DEMO_VENUES_ID } from '../../demo/data';

export function* reloadVenues() {
  const { data } = yield call(api.get, 'venues');
  const industries = yield select(selectIndustriesMap);

  const normalized = data.map((v, i) => ({
    ...v,
    industry: industries[v.industryId],
  }));

  yield put(loadVenuesDataSuccess(normalized));
  return normalized;
}

function* fetchVenueList() {
  const venues = yield select(selectVenues);

  if (venues) {
    return venues;
  }

  yield waitTillReady();
  return yield reloadVenues();
}

function* fetchPollsList() {
  const polls = yield select(selectPolls);

  if (polls) {
    return polls;
  }

  yield waitTillReady();
  return yield reloadPolls();
}

export function* reloadPolls() {
  console.log('# realod polls');
  const { data } = yield call(api.get, 'polls');
  const industries = yield select(selectIndustriesMap);

  const normalized = data.map((v, i) => ({
    ...v,
    industry: industries[v.industryId],
    isPoll: true,
  }));

  console.log(normalized);
  yield put(loadPollsDataSuccess(normalized));
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
      yield waitTillReady();
      cacheAggregate = yield select(selectAggregate);

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
    venueToSelect = venues.find((v) => v.id === +idToSelect);
  }
  if (venueToSelect) {
    yield put(setSelectedVenue(venueToSelect));
  } else {
    Router.push('/houses', '/houses', { shallow: true });
  }
}

export function* initPollsPage({ payload: { idToSelect } }) {
  console.log('# initPollsPage saga');
  if (cacheAggregate) {
    yield put(loadAggregateDataSuccess(cacheAggregate));
    setAuthorization(cacheAggregate.userId);
  }
  yield put(turnDemoOff());

  const polls = yield fetchPollsList();
  if (!idToSelect) {
    return;
  }

  const venueToSelect = polls.find((v) => v.id === +idToSelect);

  if (venueToSelect) {
    yield put(setSelectedVenue(venueToSelect));
  } else {
    Router.push('/polls', '/polls', { shallow: true });
  }
}
