import { VENUE_ID, created } from './config';
import { mockVoteRating } from '../mockFunctions';

export default [
  {
    id: 1,
    created,
    venueId: VENUE_ID,
    title: 'you make me write on glassdoor????',
    text:
      'i have never worked in a place that forces employees to give good reviews on glassdoor. isn’t this illegal — to be looking over our shoulder and telling us what to write???',
    voteCount: 18,
    voteRating: 9.0,
    myVote: mockVoteRating(),
    isMy: true,
  },
  {
    id: 2,
    created,
    venueId: VENUE_ID,
    title: 'we need health insurance',
    text:
      'some of us have been working here for over 20 years, have worked over christmas holidays and through hurricanes without ever a bonus. it is time the company offered health insurance to us and our families.',
    voteCount: 34,
    voteRating: 8.5,
    myVote: mockVoteRating(),
    isMy: true,
  },
  {
    id: 3,
    created,
    venueId: VENUE_ID,
    title: 'saturdays suck',
    text:
      'i understand we’re open and we get overtime but not being able to have a life on weekends is killing my social life',
    voteCount: 12,
    voteRating: 4.5,
    myVote: null,
    isMy: false,
  },
  {
    id: 4,
    created,
    venueId: VENUE_ID,
    title: 'ac anyone?',
    text: 'is it just me or is this place boiling??',
    voteCount: 15,
    voteRating: 4.2,
    myVote: mockVoteRating(),
    isMy: true,
  },
  {
    id: 5,
    created,
    venueId: VENUE_ID,
    title: 'millie needs to chillie',
    text:
      'unless i am forgetting, no one has ever elected millie mayor of our office. why does she walk around asking to get in everyone’s business? if we want help, we can ask',
    voteCount: 26,
    voteRating: 5.6,
    myVote: null,
    isMy: false,
  },
  {
    id: 6,
    created,
    venueId: VENUE_ID,
    title: 'maggie is the best!',
    text:
      'when someone works this hard with such great positivity and energy, why aren’t they considered for ceo?',
    voteCount: 18,
    voteRating: 8.9,
    myVote: null,
    isMy: false,
  },
  {
    id: 7,
    created,
    venueId: VENUE_ID,
    title: 'this is mark',
    text:
      'just because my desk is already in front of the bathrooms doesn’t mean it’s where you need to drop you cups of coffee — and forget them????',
    voteCount: 12,
    voteRating: 7.3,
    myVote: mockVoteRating(),
    isMy: true,
  },
  {
    id: 8,
    created,
    venueId: VENUE_ID,
    title: 'val knows she’s hot',
    text: 'someone that shy who wears such sexy shit definitely knows she’s babe. why play dumb?',
    voteCount: 23,
    voteRating: 1.4,
    myVote: mockVoteRating(),
    isMy: true,
  },
];
