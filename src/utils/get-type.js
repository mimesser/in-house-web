export default function getType(value) {
   const type = typeof value;
   if (type === 'number') {
      return 'number';
   }
   if (type === 'string') {
      return 'string';
   }
   if (type === 'function') {
      return 'function';
   }
   if (!value) {
      return 'empty';
   }
   if (Array.isArray(value)) {
      return 'list';
   }
   return 'object';
}
