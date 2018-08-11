function getType(d) {
   if (!d) return 0;
   if (Array.isArray(d)) {
      return 1;
   }
   if (typeof d === 'object') {
      return 2;
   }
   return 0;
}

function toSet(list) {
   return list.reduce((set, item) => {
      // eslint-disable-next-line no-param-reassign
      set[item.id] = item;
      return set;
   }, {});
}

/* eslint-disable brace-style, no-param-reassign */
/**
 * Here are the rules:
 * - If either param is undefined, the other will be returned.
 * - Any simple object (Number, String, null) will be replaced.
 * - The data type may not change, expect change to null or undefined.
 * - If the new data is a simple array, keep the old one.
 */
export default function merge(d1, d2) {
   console.log(d1, d2);
   if (d1 === undefined) return d2;
   if (d2 === undefined) return d1;

   const type = getType(d2);

   // if array
   if (type === 1) {
      // if existing is null, set to new array
      if (!d1) return d2;

      const first = d2[0];

      // if new is empty array, keep existing array.
      if (!first) {
         return d1;
      }

      // if the list type is simple, replace array
      if (!getType(first)) return d2;

      // convert existing array to set (for performance lookup)
      const existingSet = toSet(d1);

      // array that will be returned
      const newArray = [];

      d2.forEach((newItem) => {
         const existingItem = existingSet[newItem.id];

         // if item is found in existing array
         if (existingItem) {
            // remove from existing array (because it will be replaced)
            delete existingSet[newItem.id];

            // if the new item is not deleted, merge existing and new
            if (!newItem.deleted) {
               newArray.push(merge(existingItem, newItem));
            }
         }
         // if existing item is not found, simply add new item
         else {
            newArray.push(newItem);
         }
      });

      // add all the existing items that weren't found in the new array
      Object.keys(existingSet).forEach((id) => {
         newArray.push(existingSet[id]);
      });
      return newArray;
   }
   // if object
   if (type === 2) {
      // if existing is null, set to new object
      if (!d1) return d2;

      // goes through each new item in the object, and merge with the old
      const data = Object.keys(d2).reduce((set, id) => {
         set[id] = merge(d1[id], d2[id]);
         return set;
      }, {});
      return {
         ...d1, // spread existing object, to keep items that aren't found in new object
         ...data,
      };
   }
   return d2;
}
/* eslint-enable */
