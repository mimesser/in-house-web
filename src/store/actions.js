import { dispatch } from 'store';

export const update = aggregate => dispatch({ type: 'UPDATE', aggregate });
