import { localStorageAccessor } from '../../../utils/storage';

const CLEAR_ATTEMPT_DELAY = 60 * 1000; // 1min
const CLEAR_BLOCK_DELAY = 24 * 60 * 60 * 1000; // 24 hrs

const storageKey = venueId => `answerRecord${venueId}`;

const getEmptyRecord = () => ({ attempt: 0, time: Date.now() });
const resetRecord = venueId => {
  const newRecord = getEmptyRecord();
  setRecord(newRecord, venueId);
  return newRecord;
};

export const getRecord = venueId => {
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

export const clearRecord = venueId => localStorageAccessor.remove(storageKey(venueId));

export const setRecord = (record, venueId) => localStorageAccessor.set(storageKey(venueId), record);
