import getType from './get-type';

export default function mapValues(collection, func) {
   const type = getType(collection);

   if (type === 'object') {
      return Object.keys(collection).reduce((res, key, i) => ({
         ...res,
         [key]: func(collection[key], key, i),
      }), {});
   }

   throw new Error('You must pass in an object to mapValues');
}
