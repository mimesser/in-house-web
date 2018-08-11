import { merge } from '../utils';

export default function (state = {
   // categories,
   // cities,
   // countries,
   // industries,
   // neighborhoods,
   // regions,
   // states
}, action) {
   switch (action.type) {
      case 'UPDATE': {
         const newState = merge(state, action.aggregate);

         delete newState.booting;

         if (newState.venues) {
            newState.venues = newState.venues.map(v => ({
               ...v,
               itemsSummary: v.venueItems && (v.venueItems.map(vi => vi.itemId.name).join(', ')),
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
