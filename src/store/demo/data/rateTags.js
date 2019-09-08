import { VENUE_ID } from './config';
import { mockRating } from '../mockFunctions';

export default [
  {
    definitionId: 1,
    venueId: VENUE_ID,
    name: 'respect & appreciation',
    orderIndex: 1,
    voteRating: 2.4,
    voteCount: 39,
    userRate: mockRating(),
  },
  {
    definitionId: 2,
    venueId: VENUE_ID,
    name: 'growth opportunities',
    orderIndex: 10,
    voteRating: 5.5,
    voteCount: 34,
    userRate: null,
  },
  {
    definitionId: 3,
    venueId: VENUE_ID,
    name: 'competitive pay',
    orderIndex: 8,
    voteRating: 4.1,
    voteCount: 27,
    userRate: null,
  },
  {
    definitionId: 4,
    venueId: VENUE_ID,
    name: 'ceo / leadership',
    orderIndex: 6,
    voteRating: 6.4,
    voteCount: 29,
    userRate: null,
  },
  {
    definitionId: 5,
    venueId: VENUE_ID,
    name: 'benefits',
    orderIndex: 9,
    voteRating: 2.7,
    voteCount: 43,
    userRate: null,
  },
  {
    definitionId: 6,
    venueId: VENUE_ID,
    name: 'equal opportunity',
    orderIndex: 7,
    voteRating: 5.4,
    voteCount: 25,
    userRate: null,
  },
  {
    definitionId: 7,
    venueId: VENUE_ID,
    name: 'equal treatment',
    orderIndex: 5,
    voteRating: 3.9,
    voteCount: 33,
    userRate: null,
  },
  {
    definitionId: 8,
    venueId: VENUE_ID,
    name: 'open communication',
    orderIndex: 2,
    voteRating: 2.4,
    voteCount: 12,
    userRate: mockRating(),
  },
  {
    definitionId: 9,
    venueId: VENUE_ID,
    name: 'team culture',
    orderIndex: 3,
    voteRating: 4.9,
    voteCount: 23,
    userRate: null,
  },
  {
    definitionId: 10,
    venueId: VENUE_ID,
    name: 'work-life balance',
    orderIndex: 4,
    voteRating: 2.9,
    voteCount: 31,
    userRate: mockRating(),
  },
];
