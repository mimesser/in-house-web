import { createSelector } from 'reselect';

export const selectDemo = state => state.demo;

export const selectMockAdapter = createSelector(
   selectDemo,
   ({ mockAdapter }) => mockAdapter,
);
