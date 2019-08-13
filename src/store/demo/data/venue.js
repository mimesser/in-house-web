import { VENUE_ID, created } from './config';
import { mockRate } from '../mockFunctions';
import industry from './industry';
import minks from './minks';
import posts from './posts';
import rateTags from './rateTags';

const venueVotesCount = minks.reduce((sum, mink) => sum + mink.voteCount, 0);

export const venue = {
   id: VENUE_ID,
   industryId: industry.id,
   industry,
   name: 'sample house',
   rating: mockRate(),
   votesCount: venueVotesCount,
   insidersCount: 30,
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
   minks,
   posts,
   rates: rateTags,
};
