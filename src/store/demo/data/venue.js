import { VENUE_ID, created } from './config';
import industry from './industry';

export default {
   id: VENUE_ID,
   industryId: 1,
   industry,
   name: '[my house?]',
   rating: 9.25,
   votesCount: 24,
   insidersCount: 20,
   venueInfo: {
      zipCode: '10010',
      phone: '333-333-3333',
      address: 'Madison Avenue',
      city: 'New York City',
      state: 'New York',
      country: 'United States',
      hours: null,
      googleId: null,
      imageUrl: null,
   },
   created,
};
