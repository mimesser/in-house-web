export const normalizeAnswer = (value) => value && value.replace(/[\s\W\d_]/g, '').toLowerCase();
