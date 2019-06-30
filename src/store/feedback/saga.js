import { all, delay, takeLatest, put, call } from 'redux-saga/effects';

import api from '../../api';
import { isEmailValid } from '../../utils/validation';
import { setFeedbackError, setFeedbackLoading, setFeedbackSuccess, actionTypes, clearFeedback } from './actions';

const CONFIRMATION_DELAY = 2000;

export function* postFeedback({ payload: { subject, message, email } }) {
   const valid = email ? isEmailValid(email) : true;
   if (!valid) {
      yield put(setFeedbackError('Please provide a valid email'));
      return;
   }

   try {
      yield put(setFeedbackLoading());
      yield call(api.post, 'email/contactus', {
         subject,
         message,
         userEmail: email,
      });
      yield put(setFeedbackSuccess());
      yield delay(CONFIRMATION_DELAY);
      yield put(clearFeedback());
   } catch (e) {
      yield put(setFeedbackError('Something went wrong...'));
   }
}

export default function* feedbackSaga() {
   yield all([takeLatest(actionTypes.POST_FEEDBACK, postFeedback)]);
}
