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
      console.log(res);
      return res;
   } catch (err) {
      const { response, message } = err;
      console.log(response, message);
      if (!response) {
         // no network
         throw new Error(message);
      }

      const { status } = response;

      if (status === 422) {
         // TODO: check for expired
         throw new Error('Session expired.');
      }

      throw response;
   }
}

export default ['get', 'post', 'put', 'delete'].reduce((res, method) => ({
   ...res,
   [method]: (url, props) => request({ method, url: `${API_URL}/${url}`, ...props }),
}), {});
