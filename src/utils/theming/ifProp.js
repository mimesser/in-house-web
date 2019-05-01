import { prop } from './prop';

const parseFunction = (props, test) => Boolean(test(props));

const parseObject = (props, test) => {
   const keys = Object.keys(test);
   const { length } = keys;

   for (let index = 0; index < length; index += 1) {
      const key = keys[index];
      const expected = test[key];
      const value = prop(key)(props);
      if (expected !== value) {
         return false;
      }
   }

   return true;
};

const parseString = (props, test) => Boolean(prop(test)(props));

/**
 * Returns `pass` if prop is truthy. Otherwise returns `fail`
 */
export const ifProp = (test, pass = '', fail = '') => (props = {}) => {
   if (Array.isArray(test)) {
      const { length } = test;
      let index = 0;
      let value = pass;
      while (value !== fail && index < length) {
         value = ifProp(test[index], pass, fail)(props);
         index += 1;
      }
      return value;
   }

   const parseMap = {
      function: parseFunction,
      object: parseObject,
      string: parseString,
   };

   const result = parseMap[typeof test](props, test);
   const value = result ? pass : fail;
   return typeof value === 'function' ? value(props) : value;
};
