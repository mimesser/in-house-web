import getType from './get-type';

export default function each(collection, func) {
   const type = getType(collection);

   if (type === 'list') {
      return collection.forEach(func);
   }
   if (type === 'object') {
      return Object.keys(collection).forEach((key, i) => func(collection[key], key, i));
   }

   throw new Error('You must pass in a collection to each.');
}
