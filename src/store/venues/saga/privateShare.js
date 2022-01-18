import { put, call, delay, select } from 'redux-saga/effects';

import api from '../../../api';
import { isEmailValid, isPhoneNumberValid } from '../../../utils/validation';
import {
  SEND_STATUS,
  setPrivateShareRecipientError,
  setPrivateShareSending,
  setPrivateShareItem,
} from '../actions';
import { VENUE_TABS } from '../../../../server/venueTabs';
import { selectSelectedVenue } from '../selectors';
import { DEMO_VENUE_ID } from '../../demo/data';

const CONFIRMATION_DELAY = 1000;

export const TABS_MAB = {
  [VENUE_TABS.rate]: 'ratetags',
  [VENUE_TABS.post]: 'feedback',
  [VENUE_TABS.mink]: 'minks',
};

/**
 * @description
 * This Redux Saga function helps to share the url of the venue.
 * @param {string} venueId is the id of the Venue.
 * @param {string} type is the type of the Venue.
 * @param {string} id is the id of the mink,feedback or ratetags.
 * @returns {string} the API url endpoint for the share option.
 */

const shareUrl = (venueId, type, id) => {
  if (type === 'venue') {
    return `/Venues/${venueId}/share`;
  }

  return `/venues/${venueId}/${TABS_MAB[type]}/${id}/share`;
};

/**
 * @description
 * This Redux Saga function helps to remove the extraspaces from the phone number.
 * @param {string} n is the phone number.
 * @returns {string} trimmed and cleaned phone number.
 */

const cleanPhoneNumber = (n) => n.replace(/[()\s-.+]/g, '');

/**
 * @description
 * This Redux Saga function helps to share message with other user via  email or phone number. .
 * @param {string} type is the type of house.
 * @param {string} id is the id of house.
 * @param {string} recipient is the person who recieves the message.
 * @param {string} message is the message of  user.
 * @returns Nothing
 */

export function* privateShare({ payload: { type, id, recipient, message } }) {
  const viaEmail = recipient.indexOf('@') !== -1;
  const validator = viaEmail ? isEmailValid : isPhoneNumberValid;

  const valid = validator(recipient);
  if (!valid) {
    yield put(setPrivateShareRecipientError('Please provide a valid email or mobile'));
    return;
  }

  const contactDetails = viaEmail ? recipient : cleanPhoneNumber(recipient);

  const venueId = type === 'venue' ? id : (yield select(selectSelectedVenue)).id;

  try {
    yield put(setPrivateShareSending(SEND_STATUS.sending));
    yield call(api.post, shareUrl(venueId, type, id), {
      contactMethod: viaEmail ? 'Email' : 'Sms',
      contactDetails,
      message,
    });
    yield put(setPrivateShareSending(SEND_STATUS.sent));
    if (venueId === DEMO_VENUE_ID) return;
    yield delay(CONFIRMATION_DELAY);
    yield put(setPrivateShareItem(undefined));
  } catch (e) {
    yield put(setPrivateShareRecipientError('Please provide a valid email or mobile'));
    yield put(setPrivateShareSending(SEND_STATUS.idle));
    // TODO: handle only validation error
  }
}
