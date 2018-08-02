import toObject from './to-object';
import map from './map';

export default function mergeLists(oldList, newList, key = 'id') {
   if (!newList) return oldList;
   if (!oldList) return newList;

   const newSet = toObject(newList, key);

   const existingList = oldList.map((item) => {
      const updateItem = newSet[item[key]];
      if (updateItem) {
         // delete item from set if found, so that only new items remain.
         delete newSet[item[key]];
         return { ...item, ...updateItem };
      }
      return item;
   });

   return [
      ...existingList,
      ...map(newSet, value => value),
   ];
}
