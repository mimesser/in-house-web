import { setHeaderAuthorization } from 'api';

export function setToken (token) {
   localStorage.setItem('token', token);

   setHeaderAuthorization(token);
}

export function getToken () {
   return localStorage.getItem('token');
}
