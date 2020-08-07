import { call, put, delay, select } from 'redux-saga/effects';

import api from '../../../api';
import { termsAccepted, selectAggregate } from '../../aggregate';
import { setChallengeFormData, showWelcomeForm } from '../actions';

import { localStorageAccessor } from '../../../utils/storage';

export function* acceptTerms() {
  yield call(api.post, 'user/acceptTerms');
  yield put(setChallengeFormData(undefined));
  yield put(termsAccepted());

  yield delay(7000);
  const { userId } = yield select(selectAggregate);
  const storageKey = `user/${userId}/skipWelcomeCout`;
  const skipWelcome = localStorageAccessor.get(storageKey, 0);

  if (skipWelcome < 2) {
    yield put(showWelcomeForm());
  }
}
