export default function times(count, func) {
   return Array(count).fill().map((_, i) => func(i));
}
