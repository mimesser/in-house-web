import api from '../../../api';

function fetchVenuesMinkAnswer(venueId, minkId, answer) {
   console.log('Called fetchVenuesMinkAnswer(venueId, minkId, answer): ', venueId, minkId, answer);
   return api
      .get(`Venues/${venueId}/mink/${minkId}/answer`, {
         method: 'GET',
         params: { answer },
      })
      .then(response => response.data);
}

export default fetchVenuesMinkAnswer;
