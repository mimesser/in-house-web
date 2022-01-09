import { call, put, delay, select } from 'redux-saga/effects';

import api from '../../../api';
import { termsAccepted } from '../../aggregate';

/**
 *
 * @description
 * This Redux-Saga function helps to accept the user terms.
 *
 * @returns none
 */

export function* acceptTerms() {
  yield call(api.post, 'user/acceptTerms');
  yield put(termsAccepted());
}
