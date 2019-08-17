import { select, put } from 'redux-saga/effects';
import Router from 'next/router';

import { selectSelectedVenue } from '../selectors';
import { setChallengeFormData } from '../actions';
import { selectInDemo } from '../../demo';

export function* dismissChallengeForm({ payload: { showMinks } }) {
   const { id } = yield select(selectSelectedVenue);
   const inDemo = yield select(selectInDemo);
   if (showMinks) {
      Router.push(`/houses?id=${id}&tab=mink`, `/houses/${id}/mink`, { shallow: true });
   } else {
      const redirectUrl = inDemo ? '/how-it-works?step=5' : '/houses';
      Router.push(redirectUrl, redirectUrl, { shallow: true });
   }
   yield put(setChallengeFormData(undefined));
}
