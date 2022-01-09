import { call, select, put, putResolve, delay, all } from 'redux-saga/effects';
import api, { isForbidden } from '../../../api';
import { handleForbiddenResponse } from './handleForbiddenResponse';
import {
  selectSelectedMink,
  selectSelectedVenue,
  selectSelectedVenueTopMinkId,
  selectAnswerMinkStatus,
} from '../selectors';
import {
  showVoteMinkConfirmation,
  setSelectedMink,
  setNewMinkElected,
  setVenueMinks,
  tryAnswerMink,
} from '../actions';
import { reloadVenueMinks } from './loadVenueMinks';
import { reloadInsiderVenueIds } from './reloadInsiderVenueIds';
import { CONFIRMATION_INTERVAL } from './consts';
import { watchMinkAnswerAttempts } from './watchMinkAnswerAttempts';

/**
 *
 * @description
 * This Redux-Saga function helps to Vote and DownVote the minks.
 * @param {number} vote  Vote is number which would be 1 or -1. 1 means upvote and -1 means downvote the mink.
 * @param {string} minkId   minkId is the id of the mink that the user is going to upvote or downvote.
 * @param {boolean} skipConfirmation skipConfirmation is for checking the voteRating and voteCount. If the skipConfirmation is false vote Rating and voteCount is uptodate but if not
 * it will update the voteRating and voteCount. The default value is false for skipConfirmation
 * @returns { object} { venue, mink, topMink}
 */

export function* voteMink({ payload: { vote, minkId, skipConfirmation = false } }) {
  const selectedVenue = yield select(selectSelectedVenue);
  const topMinkId = yield select(selectSelectedVenueTopMinkId);

  try {
    const {
      data: { mink: updatedMink, topMink, venue },
    } = yield call(api.post, `venues/${selectedVenue.id}/mink/${minkId}/rate`, { vote });

    if (venue.id === selectedVenue.id && updatedMink.id === minkId) {
      const updatedMinks = selectedVenue.minks.map((m) => (m.id === minkId ? updatedMink : m));

      if (!skipConfirmation) {
        yield put(
          // @TODO check for MinkTab why not displaying in GUI
          showVoteMinkConfirmation({
            voteRating: updatedMink.voteRating,
            voteCount: updatedMink.voteCount,
          }),
        );
        yield delay(CONFIRMATION_INTERVAL);
        yield putResolve(showVoteMinkConfirmation(undefined));
      }

      yield put(setVenueMinks(updatedMinks));
    }

    if (typeof topMink?.id === 'string' && topMink.id !== topMinkId) {
      yield all([reloadInsiderVenueIds(), reloadVenueMinks(venue.id)]);

      yield put(setNewMinkElected(true));
      yield delay(CONFIRMATION_INTERVAL);
      yield put(setNewMinkElected(false));
    }

    return { venue, mink: updatedMink, topMink };
  } catch (e) {
    if (isForbidden(e)) {
      yield handleForbiddenResponse(selectedVenue.id);
    }

    throw e;
  } finally {
    if (!skipConfirmation) {
      yield put(showVoteMinkConfirmation(undefined));
      yield put(setSelectedMink(undefined));
    }
  }
}

/**
 *
 * @description
 * This Redux-Saga function helps to DownVote the minks.
 * @param {string} minkId   minkId is the id of the mink that the user is going to upvote or downvote.
 * @param {boolean} skipConfirmation skipConfirmation is for checking the voteRating and voteCount. If the skipConfirmation is false vote Rating and voteCount is uptodate but if not
 * it will update the voteRating and voteCount. The default value is false for skipConfirmation
 * @returns { object} { venue, mink, topMink}
 */

export function* downvoteMink(minkId, skipConfirmation = false) {
  return yield* voteMink({ payload: { vote: -1, minkId, skipConfirmation } });
}

/**
 *
 * @description
 * This Redux-Saga function helps to UpVote the minks.
 * @param {string} minkId   minkId is the id of the mink that the user is going to upvote or downvote.
 * @param {boolean} skipConfirmation skipConfirmation is for checking the voteRating and voteCount. If the skipConfirmation is false vote Rating and voteCount is uptodate but if not
 * it will update the voteRating and voteCount. The default value is false for skipConfirmation
 * @returns { object} { venue, mink, topMink}
 */

export function* upvoteMink(minkId, skipConfirmation = false) {
  return yield* voteMink({ payload: { vote: 1, minkId, skipConfirmation } });
}
