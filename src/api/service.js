import axios from 'axios';
import { API_URL } from '../settings';

const TOKEN_KEY = 'in-house/token';

export const api = axios.create({
  baseURL: API_URL,
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

export function clearAuthorization() {
  localStorage.removeItem(TOKEN_KEY);
  delete api.defaults.headers.Authorization;
}
