import axios from 'axios';

const TOKEN_KEY = 'in-house/token';

export const api = axios.create({
  baseURL: process.env.API_URL,
});

if (process.browser) {
  const cachedToken = localStorage && localStorage.getItem(TOKEN_KEY);
  if (cachedToken) {
    setAuthorization(cachedToken);
  }
}

export function setAuthorization(token) {
  if (process.browser) {
    localStorage.setItem(TOKEN_KEY, token);
  }
  api.defaults.headers.Authorization = `token ${token}`;
}

export function clearAuthorization() {
  localStorage.removeItem(TOKEN_KEY);
  delete api.defaults.headers.Authorization;
}
