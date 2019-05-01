import api from '../../../api';

function fetchVenuesTopMink(id) {
   return api.get(`Venues/${id}/topmink`, { method: 'GET' }).then(response => response.data);
}

export default fetchVenuesTopMink;
