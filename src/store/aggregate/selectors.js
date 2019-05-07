const s = state => state.aggregate || {};

export const aggregateUserIdSelector = state => s(state).userId || undefined;
