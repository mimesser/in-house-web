import { call, put, debounce, takeLatest } from 'redux-saga/effects';

import { actionTypes, setAnswerMinkStatus, setMyCorrectAnswer } from '../actions';
import api from '../../../api';
import { reloadInsiderVenueIds } from './reloadInsiderVenueIds';

function* setStatus(status) {
   yield put(setAnswerMinkStatus(status));
}

function* tryAnswer({ payload: { venueId, minkId, answer } }) {
   if (!answer) {
      yield setStatus({ isAnswerCorrect: undefined });
      return;
   }

   const {
      data: { isAnswerCorrect },
   } = yield call(api.post, `venues/${venueId}/mink/${minkId}/answer`, { answer });

   yield setStatus({ isAnswerCorrect });

   if (isAnswerCorrect) {
      yield put(setMyCorrectAnswer(minkId, answer));
      yield reloadInsiderVenueIds();
   }
}

const DELAY = 300;
export function* watchMinkAnswerAttempts() {
   yield setStatus(undefined);
   yield takeLatest(actionTypes.TRY_ANSWER_MINK, setStatus, { loading: true });
   yield debounce(DELAY, actionTypes.TRY_ANSWER_MINK, tryAnswer);
}
