import axios from 'axios';

import { config } from './config';

const TOKEN_KEY = 'in-house/token';

const api = axios.create({
   baseURL: config.baseUrl,
});

if (process.browser) {
   const cachedToken = localStorage && localStorage.getItem(TOKEN_KEY);
   if (cachedToken) {
      setAuthorization(cachedToken);
   }
}

export function setAuthorization(token) {
   localStorage.setItem(TOKEN_KEY, token);
   api.defaults.headers.Authorization = `token ${token}`;
}

export default api;

export const isConflict = e => e && e.response && e.response.status === 409;
