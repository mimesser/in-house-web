import { select, put } from 'redux-saga/effects';
import Router from 'next/router';

import { selectSelectedVenue } from '../selectors';
import { setChallengeFormData } from '../actions';

export function* dismissChallengeForm() {
   const { id } = yield select(selectSelectedVenue);
   Router.push(`/houses?id=${id}&tab=mink`, `/houses/${id}/mink`, { shallow: true });
   yield put(setChallengeFormData(undefined));
}
