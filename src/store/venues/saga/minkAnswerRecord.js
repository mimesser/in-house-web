import { localStorageAccessor } from '../../../utils/storage';

const CLEAR_ATTEMPT_DELAY = 60 * 1000; // 1min
const CLEAR_BLOCK_DELAY = 24 * 60 * 60 * 1000; // 24 hrs

const storageKey = (venueId) => `answerRecord${venueId}`;

const getEmptyRecord = () => ({ attempt: 0, time: Date.now() });

/**
 * @description
 * This Redux Saga function helps to get reset answers mink.
 * @param {string} venueId is the id of the Venue.
 * @returns {object} The attempt counts and time.
 */

const resetRecord = (venueId) => {
  const newRecord = getEmptyRecord();
  setRecord(newRecord, venueId);
  return newRecord;
};

/**
 * @description
 * This Redux Saga function helps to get record of answers mink.
 * @param {string} venueId is the id of the Venue.
 * @returns {object} The attempt counts and time.
 */

export const getRecord = (venueId) => {
  const record = localStorageAccessor.get(storageKey(venueId), getEmptyRecord());
  if (record.blocked) {
    if (Date.now() - CLEAR_BLOCK_DELAY > record.time) {
      return resetRecord(venueId);
    }
    return record;
  }

  if (Date.now() - CLEAR_ATTEMPT_DELAY > record.time) {
    return resetRecord(venueId);
  }
  return record;
};

/**
 * @description
 * This Redux Saga function helps to clear record of answers mink.
 * @param {string} venueId is the id of the Venue.
 */

export const clearRecord = (venueId) => localStorageAccessor.remove(storageKey(venueId));

/**
 * @description
 * This Redux Saga function helps to set record of answers mink.
 * @param {object} record is the object of attempts and time.
 * @param {string} venueId is the id of the Venue.
 */

export const setRecord = (record, venueId) => localStorageAccessor.set(storageKey(venueId), record);
