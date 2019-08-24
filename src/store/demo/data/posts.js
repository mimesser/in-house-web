import { mockRating } from '../mockFunctions';

import { VENUE_ID, created } from './config';

export default [
  {
    id: 1,
    created,
    venueId: VENUE_ID,
    title: 'you make me write on glassdoor????',
    text:
      'i have never worked in a place that forces employees to give good reviews on glassdoor. isn’t this illegal — to be looking over our shoulder and telling us what to write???',
    voteCount: 34,
    voteRating: mockRating(),
    myVote: null,
    isMy: false,
  },
  {
    id: 2,
    created,
    venueId: VENUE_ID,
    title: 'we need health insurance',
    text:
      'some of us have been working here for over 20 years, have worked over christmas holidays and through hurricanes without ever a bonus. it is time the company offered health insurance to us and our families.',
    voteCount: 25,
    voteRating: mockRating(),
    myVote: null,
    isMy: false,
  },
  {
    id: 3,
    created,
    venueId: VENUE_ID,
    title: 'saturdays suck',
    text:
      'i understand we’re open and we get overtime but not being able to have a life on weekends is killing my social life',
    voteCount: 22,
    voteRating: mockRating(),
    myVote: null,
    isMy: false,
  },
  {
    id: 4,
    created,
    venueId: VENUE_ID,
    title: 'ac anyone?',
    text: 'is it just me or is this place boiling??',
    voteCount: 18,
    voteRating: mockRating(),
    myVote: null,
    isMy: false,
  },
  {
    id: 5,
    created,
    venueId: VENUE_ID,
    title: 'millie needs to chillie',
    text:
      'unless i am forgetting, no one has ever elected millie mayor of our office. why does she walk around asking to get in everyone’s business? if we want help, we can ask',
    voteCount: 21,
    voteRating: mockRating(),
    myVote: null,
    isMy: false,
  },
];
