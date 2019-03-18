import axios from 'axios';


const api = axios.create({
   baseURL: 'https://inhousecore.azurewebsites.net/api',
   // withCredentials: false,
   headers: {
      Accept: 'application/json',
      // 'cache-control': 'no-cache'
   },
   // headers: {
   //    
   //    'Content-Type': 'application/json',
   //    'Access-Control-Allow-Origin': '*',
   //    'Access-Control-Request-Method': '*',
   //    'Access-Control-Allow-Headers': '*'
   // },
});

   // const cachedToken = localStorage.getItem('in-house/token');

export function setAuthorization(token) {
   localStorage.setItem('in-house/token', token);
   api.defaults.headers.Authorization = `token ${token}`;
}


export default api;
