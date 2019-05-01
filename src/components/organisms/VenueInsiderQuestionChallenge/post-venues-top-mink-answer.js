import api from '../../../api';

function postVenuesTopMinkAnswer(id, minkID, answer) {
   return api
      .get(`Venues/${id}/mink${minkID}/answer`, {
         method: 'POST',
         body: { answer },
      })
      .then(response => response.data);
}

export default postVenuesTopMinkAnswer;
