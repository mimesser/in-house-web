import { put, select, delay } from 'redux-saga/effects';

import { setChallengeFormData } from '../actions';
import { selectIsActiveInsider } from '../selectors';
import { showInsiderChallenge } from './showInsiderChallenge';

const DELAY_BEFORE_CHALLENGE = 500;
const DELAY_CONFIRMATION = 1000;

export function* setSelectedVenue({ payload: { venue: { id } = {} } }) {
   if (!id) {
      return;
   }

   yield delay(DELAY_BEFORE_CHALLENGE);
   const isActiveInsider = yield select(selectIsActiveInsider);

   if (isActiveInsider) {
      yield put(setChallengeFormData({ isAnswerCorrect: true }));
      yield delay(DELAY_CONFIRMATION);
      yield put(setChallengeFormData(undefined));
      return;
   }

   yield showInsiderChallenge(id);
}
