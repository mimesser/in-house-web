import { getType, mergeLists, mapValues } from '../utils';

export default function (state = {}, action) {
   switch (action.type) {
      case 'UPDATE': {
         return mapValues(action.aggregate, (newData, key) => {
            const oldData = state[key];
            const type = getType(oldData);
            if (type === 'array') return mergeLists(oldData, newData);
            if (type === 'object') return { ...oldData, ...newData };
            return newData;
         });
      }
      default:
         return state;
   }
}
