import { call, put, delay, select } from 'redux-saga/effects';

import api from '../../../api';
import { termsAccepted } from '../../aggregate';

export function* acceptTerms() {
  yield call(api.post, 'user/acceptTerms');
  yield put(termsAccepted());
}
