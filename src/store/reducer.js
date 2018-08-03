import { getType, mergeLists, mapValues } from '../utils';

export default function (state = {}, action) {
   switch (action.type) {
      case 'UPDATE': {
         return mapValues(action.aggregate, (newData, key) => {
            if (key === 'venues') {
               return mergeLists(state[key], newData.map(d => ({
                  ...d,
                  itemsSummary: (d.venueItems.map(vi => vi.name).join(', ')),
               })));
            }

            const oldData = state[key];
            const type = getType(oldData);

            if (type === 'array') return mergeLists(oldData, newData);
            if (type === 'object') return { ...oldData, ...newData };
            return newData;
         });
      }
      case 'SET_USER': {
         return {
            ...state,
            user: action.user,
         };
      }
      default:
         return state;
   }
}
