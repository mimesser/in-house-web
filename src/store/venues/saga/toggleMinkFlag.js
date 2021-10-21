import { call, delay, select, put, putResolve, all } from 'redux-saga/effects';

import api from '../../../api';
import {
  selectSelectedVenue,
  selectSelectedMink,
  selectSelectedVenueTopMinkId,
} from '../selectors';
import { setVenueMinks, setSelectedMink, setNewMinkElected, toggleFlagError } from '../actions';
import { reloadInsiderVenueIds } from './reloadInsiderVenueIds';
import { reloadVenueMinks } from './loadVenueMinks';
import { downvoteMink } from './voteMink';

const CONFIRMATION_DELAY = 1500;

export function* toggleMinkFlag({ payload: { wasVotedByMe } }) {
  const mink = yield select(selectSelectedMink);

  try {
    if (!wasVotedByMe && !mink.wasFlaggedByMe) {
      yield call(downvoteMink, mink.id);
      yield putResolve(setSelectedMink(mink.id));
    }

    const venue = yield select(selectSelectedVenue);
    const { data: response } = yield call(
      api.put,
      `venues/${venue.id}/minks/${mink.id}/${mink.wasFlaggedByMe ? 'unflag' : 'flag'}`,
    );

    if (response.success) {
      if (response.wasDeleted) {
        const minkId = `${mink.id}`;
        const { minks } = venue;
        const topMinkId = yield select(selectSelectedVenueTopMinkId);
        const wasTopMink = minkId === `${topMinkId}`;

        yield put(toggleFlagError('Group affirmation level reached: Deleting ...'));
        yield delay(CONFIRMATION_DELAY);
        yield put(toggleFlagError(''));

        if (wasTopMink) {
          const ts = Date.now();
          let restDelay = CONFIRMATION_DELAY;

          yield put(setNewMinkElected(true));
          yield all([reloadInsiderVenueIds(), reloadVenueMinks(venue.id)]);

          restDelay -= Date.now() - ts;

          if (restDelay > 0) {
            yield delay(restDelay);
          }

          yield put(setNewMinkElected(false));
        } else {
          const filteredMinks = minks.filter((m) => m.id !== minkId);
          yield put(setVenueMinks(filteredMinks));
        }
      } else {
        const updatedMinks = venue.minks.slice();
        const index = updatedMinks.findIndex((p) => p.id === mink.id);
        updatedMinks[index] = {
          ...mink,
          wasDeleted: response.wasDeleted,
          wasFlaggedByMe: response.wasFlaggedByMe,
        };

        yield put(setVenueMinks(updatedMinks));

        if (response.wasFlaggedByMe) {
          yield put(toggleFlagError('Flagged for deletion: awaiting group confirmation.'));
          yield delay(CONFIRMATION_DELAY);
          yield put(toggleFlagError(''));
        } else {
          yield put(toggleFlagError('Flag removed successfully!'));
          yield delay(CONFIRMATION_DELAY);
          yield put(toggleFlagError(''));
        }
      }
    } else {
      yield put(toggleFlagError('Whoopsie daisy, something went wrong ...'));
      yield delay(CONFIRMATION_DELAY);
      yield put(toggleFlagError(''));
    }
  } catch (e) {
    yield put(toggleFlagError('Whoopsie daisy, something went wrong ... sorry for that!'));
    yield delay(CONFIRMATION_DELAY);
    yield put(toggleFlagError(''));

    throw e;
  } finally {
    yield put(setSelectedMink(undefined));
  }
}
