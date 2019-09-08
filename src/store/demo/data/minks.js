import { mockRating } from '../mockFunctions';
import { created } from './config';

const topVoteRating = mockRating();

export default [
  {
    id: 1,
    created,
    answer: 'happyworker2020',
    question: 'what is the office wifi password? [happyworker2020]',
    voteRating: topVoteRating,
    voteCount: 26,
    myCorrectAnswer: null,
    myVote: null,
  },
  {
    id: 2,
    created,
    answer: 'beyonce',
    question: 'who is sergio’s muse? [beyonce]',
    voteRating: topVoteRating,
    voteCount: 25,
    myCorrectAnswer: null,
    myVote: null,
  },
  {
    id: 3,
    created,
    answer: 'blue',
    question: 'what’s the color of my blue suede shoes?',
    voteRating: topVoteRating,
    voteCount: 25,
    myCorrectAnswer: null,
    myVote: null,
  },
];
