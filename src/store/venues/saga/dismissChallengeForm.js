import { select, put } from 'redux-saga/effects';
import Router from 'next/router';

import { selectSelectedVenue } from '../selectors';
import { setChallengeFormData } from '../actions';
import { selectInDemo } from '../../demo';

export function* dismissChallengeForm() {
   const { id } = yield select(selectSelectedVenue);
   const inDemo = yield select(selectInDemo);
   const redirectUrl = inDemo ? '/how-it-works?step=5' : '/houses';
   Router.push(redirectUrl, redirectUrl, { shallow: true });
   yield put(setChallengeFormData(undefined));
}
