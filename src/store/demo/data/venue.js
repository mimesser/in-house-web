import orderBy from 'lodash/orderBy';

import { VENUE_ID, created } from './config';
import { mockRating } from '../mockFunctions';
import industry from './industry';
import minks from './minks';
import posts from './posts';
import rateTags from './rateTags';

export default {
  id: VENUE_ID,
  industryId: industry.id,
  industry,
  name: 'your house?',
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
    imageUrl: '../../../static/demo_house.webp',
  },
  created,
  minks: orderBy(minks, ['voteRating'], ['desc']),
  posts: orderBy(posts, ['voteCount'], ['desc']),
  rates: orderBy(rateTags, ['orderIndex']),
};
