import orderBy from 'lodash/orderBy';

import { VENUE_ID, created } from './config';
import { mockRating } from '../mockFunctions';
import industry from './industry';
import minks from './minks';
import posts from './posts';
import rateTags from './rateTags';

export const venue = {
  id: VENUE_ID,
  industryId: industry.id,
  industry,
  name: 'your job',
  rating: mockRating(),
  votesCount: minks.reduce((sum, mink) => sum + mink.voteCount, 0),
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
    imageUrl: 'https://media.kasperskydaily.com/wp-content/uploads/sites/92/2015/02/06041313/VK1.png',
  },
  created,
  minks: orderBy(minks, ['voteRating'], ['desc']),
  posts: orderBy(posts, ['voteCount'], ['desc']),
  rates: orderBy(rateTags, ['orderIndex']),
};
