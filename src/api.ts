import { getToken } from 'auth';
import axios from 'axios';

const api = axios.create({
   baseURL: 'http://localhost:32769/api/',
});

export function setHeaderAuthorization (token) {
   api.defaults.headers.Authorization = `token ${token}`;
}

const cachedToken = getToken();
if (cachedToken) {
   setHeaderAuthorization(cachedToken);
}

export default api;
