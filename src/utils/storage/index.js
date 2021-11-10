import isNil from 'lodash/isNil';

export const localStorageAccessor = {
  get(key, defaultValue) {
    let value;

    try {
      value = localStorage.getItem(key);
    } catch (error) {
      this.remove(key);

      return defaultValue;
    } finally {
      value = isNil(value) ? defaultValue : JSON.parse(value);
    }

    return value;
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
