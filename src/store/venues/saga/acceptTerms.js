import { call, put } from 'redux-saga/effects';

import api from '../../../api';
import { termsAccepted } from '../../aggregate';
import { setChallengeFormData } from '../actions';

export function* acceptTerms() {
  yield call(api.post, 'user/acceptTerms');
  yield put(setChallengeFormData(undefined));
  yield put(termsAccepted());
}
