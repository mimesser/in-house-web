const isStatus = (code) => (e) => e && e.response && e.response.status === code;

export const isConflict = isStatus(409);
export const isForbidden = isStatus(403);
export const isUnauthorized = isStatus(401);
