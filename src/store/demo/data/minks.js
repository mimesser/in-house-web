import { mockRate } from '../mockFunctions';
import { created } from './config';

export default [
   {
      id: 1,
      created,
      answer: 'happyworker2020',
      question: 'what is the office wifi password? [happyworker2020]?',
      voteRating: mockRate(),
      voteCount: 30,
      myCorrectAnswer: null,
      myVote: null,
   },
   {
      id: 2,
      created,
      answer: 'beyonce',
      question: 'who is sergio’s muse? [beyonce]?',
      voteRating: mockRate(),
      voteCount: 25,
      myCorrectAnswer: null,
      myVote: null,
   },
   {
      id: 3,
      created,
      answer: 'blue',
      question: 'what’s the color of my blue suede shoes?',
      voteRating: mockRate(),
      voteCount: 16,
      myCorrectAnswer: null,
      myVote: null,
   },
];
