import { put, call, delay } from 'redux-saga/effects';

import { isEmailValid, isPhoneNumberValid } from '../../../utils/validation';
import { SEND_STATUS, setPrivateShareRecipientError, setPrivateShareSending, setPrivateShareItemId } from '../actions';

const CONFIRMATION_DELAY = 1000;

export function* privateShare({ payload: { type, id, recipient, message } }) {
   const viaEmail = recipient.indexOf('@') !== -1;
   const validator = viaEmail ? isEmailValid : isPhoneNumberValid;

   const valid = validator(recipient);
   if (!valid) {
      yield put(setPrivateShareRecipientError('Please provide a valid email or mobile'));
      return;
   }

   try {
      yield put(setPrivateShareSending(SEND_STATUS.sending));
      console.log('share via ', viaEmail ? 'email' : 'sms');
      // TODO call api
      yield delay(1000);

      yield put(setPrivateShareSending(SEND_STATUS.sent));
      yield delay(CONFIRMATION_DELAY);
      yield put(setPrivateShareItemId(undefined));
   } catch (e) {
      yield put(setPrivateShareSending(SEND_STATUS.idle));
      // TODO: handle validation error
      throw e;
   }
}
