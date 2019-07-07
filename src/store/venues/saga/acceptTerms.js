import { put, delay } from 'redux-saga/effects';

import { termsAccepted } from '../../aggregate';
import { setChallengeFormData } from '../actions';

export function* acceptTerms() {
   // TODO: fork api call
   yield delay(500);
   yield put(setChallengeFormData(undefined));
   yield put(termsAccepted());
}
