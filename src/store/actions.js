import { dispatch } from 'store';

export const update = aggregate => dispatch({ type: 'UPDATE', aggregate });
export const setUser = user => dispatch({ type: 'SET_USER', user });
export const setVenue = venue => dispatch({ type: 'SET_VENUE', venue });
