import axios from 'axios';

import { settings } from '../settings';

const TOKEN_KEY = 'in-house/token';

export const api = axios.create({
   baseURL: settings.apiUrl,
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
