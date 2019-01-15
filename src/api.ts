import axios from 'axios';

const api = axios.create({
   baseURL: `https://in-house-dev.azurewebsites.net/api/`,
});

export default api;
