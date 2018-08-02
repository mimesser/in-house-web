export default function toObject(list, valueKey) {
   if (!valueKey) {
      return list.reduce((res, item) => (
         { ...res, [item]: true }
      ), {});
   }
   return list.reduce((obj, item) => (
      { ...obj, [item[valueKey]]: item }
   ), {});
}
