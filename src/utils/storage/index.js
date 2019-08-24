import isNil from 'lodash/isNil';

export const localStorageAccessor = {
  get(key, defaultValue) {
    try {
      const value = localStorage.getItem(key);
      return isNil(value) ? defaultValue : JSON.parse(value);
    } catch (error) {
      // ignore corrupted items
      return defaultValue;
    }
  },
  set(key, value) {
    if (isNil(value)) {
      this.remove(key);
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};
