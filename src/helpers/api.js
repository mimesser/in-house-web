import axios from 'axios';
import { API_URL } from 'config';

import { getToken } from './auth';

async function request(data, props) {
   const token = getToken();

   const headers = token
      ? { authorization: `token ${token}` }
      : null;

   try {
      const res = await axios({
         ...data,
         headers,
         ...props,
      });

      return res;
   } catch (err) {
      const { response, message } = err;

      if (!response) {
         // no network
         throw new Error(message);
      }

      throw response;
   }
}

export default ['get', 'post', 'put', 'delete'].reduce((res, method) => ({
   ...res,
   [method]: (url, data, props) => {
      if (method === 'get' || method === 'delete') {
         return request({ method, url: `${API_URL}/${url}`, ...data });
      }
      return request({
         method, url: `${API_URL}/${url}`, data, ...props,
      });
   },
}), {});
