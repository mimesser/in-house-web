import _get from 'lodash/get';

/**
 * Returns the value of `props[path]` or `defaultValue`
 */
export const prop = (path, defaultValue) => (props = {}) => _get(props, path, defaultValue);
