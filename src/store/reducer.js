import { merge } from '../utils';

export default function (state = {}, action) {
   switch (action.type) {
      case 'UPDATE': {
         const newState = action.aggregate.reset
            ? action.aggregate
            : merge(state, action.aggregate);

         delete newState.booting;

         if (newState.venues) {
            const itemTypeNames = newState.itemTypes.reduce((res, itemType) => ({
               ...res, [itemType.id]: itemType.name,
            }), {});

            newState.venues = newState.venues.map(v => ({
               ...v,
               itemsSummary: v.itemTypeIds.map(i => itemTypeNames[i]).join(', '),
            }));
         }

         return newState;
      }
      case 'SET_USER': {
         return {
            ...state,
            user: action.user,
         };
      }
      case 'SET_VENUE': {
         return {
            ...state,
            venues: state.venues.map(v => (
               v.id === action.venue.id
                  ? merge(v, action.venue)
                  : v
            )),
         };
      }
      default:
         return state;
   }
}
