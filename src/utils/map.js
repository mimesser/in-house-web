import getType from './get-type';

export default function filter(collection, func) {
   const type = getType(collection);

   if (type === 'array') {
      return collection.map(func);
   }
   if (type === 'object') {
      return Object.keys(collection).map((key, i) => func(collection[key], key, i));
   }
   if (type === 'string') {
      return collection.split('').map(func);
   }

   throw new Error('You must pass in a collection to filter.');
}
