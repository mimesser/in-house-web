import maxBy from 'lodash/maxBy';

import { VENUE_ID } from './data';
import { createDemoMink, createDemoPost, voteDemoPost, voteDemoMink, rateDemoTag } from './actions';
import {
   selectDemoData,
   selectDemoVenue,
   selectDemoPosts,
   selectDemoAggregate,
   selectDemoMinks,
   selectDemoRateTags,
} from './selectors';

export default function configureMockAdapterRoutes(mock, store) {
   // TODO: translate from server implementation..
   const computeVoteRating = (value, total, count) => {
      const result = total + value / count;
      return parseFloat(result.toFixed(2));
   };

   const configureRateTagRoute = tag => {
      mock.onPost(`venues/${VENUE_ID}/rateTag/${tag.definitionId}/rate`).reply(config => {
         const { rate } = JSON.parse(config.data);
         const venue = selectDemoVenue(store.getState());
         const voteCount = tag.voteCount + 1;
         const voteRating = computeVoteRating(rate, tag.voteRating, voteCount);
         const ratedTag = {
            ...tag,
            voteCount,
            voteRating,
            userRate: rate,
         };
         store.dispatch(rateDemoTag(ratedTag));
         return [
            200,
            {
               venue,
               venueRateTag: ratedTag,
            },
         ];
      });
   };

   const configureMinkRoute = mink => {
      mock.onPost(`venues/${VENUE_ID}/mink/${mink.id}/rate`).reply(config => {
         const { vote } = JSON.parse(config.data);
         const voteCount = mink.voteCount + 1;
         const voteRating = computeVoteRating(vote, mink.voteRating, voteCount);
         const votedMink = {
            ...mink,
            myCorrectAnswer: mink.answer,
            myVote: vote,
            voteCount,
            voteRating,
         };
         store.dispatch(voteDemoMink(votedMink));
         return [200, votedMink];
      });

      mock.onPost(`venues/${VENUE_ID}/mink/${mink.id}/answer`).reply(config => {
         const { answer } = JSON.parse(config.data);
         return [200, { isAnswerCorrect: answer === mink.answer }];
      });
   };

   const configurePostRoute = post => {
      mock.onPost(`venues/${VENUE_ID}/feedback/${post.id}/vote`).reply(config => {
         const { vote } = JSON.parse(config.data);
         const voteCount = post.voteCount + 1;
         const voteRating = computeVoteRating(vote, post.voteRating, voteCount);
         const votedPost = {
            ...post,
            voteCount,
            voteRating,
         };
         store.dispatch(voteDemoPost(votedPost));
         return [200, votedPost];
      });
   };

   mock.onGet('/aggregate').reply(config => {
      const aggregate = selectDemoAggregate(store.getState());
      return [200, aggregate];
   });
   mock.onGet('venues').reply(config => {
      const venue = selectDemoVenue(store.getState());
      return [200, [venue]];
   });
   mock.onGet(`/venues/${VENUE_ID}/minks`).reply(config => {
      const minks = selectDemoMinks(store.getState());
      return [200, { minks, totalCount: minks.length }];
   });
   mock.onGet(`/Venues/${VENUE_ID}/rateTags`).reply(config => {
      const rateTags = selectDemoRateTags(store.getState());
      return [200, rateTags];
   });
   mock.onGet(`/venues/${VENUE_ID}/feedback?OrderBy=VoteRating`).reply(config => {
      const posts = selectDemoPosts(store.getState());
      return [200, { feedback: posts, totalCount: posts.length }];
   });
   mock.onGet(`venues/${VENUE_ID}/topmink`).reply(config => {
      const minks = selectDemoMinks(store.getState());
      const topMink = maxBy(minks, mink => mink.voteRating);
      return [200, topMink];
   });
   mock.onPost('/user/acceptTerms').reply(config => {
      return [204, {}];
   });
   mock.onPost(`/venues/${VENUE_ID}/feedback`).reply(config => {
      const { title, text } = JSON.parse(config.data);
      const date = new Date();
      const posts = selectDemoPosts(store.getState());
      const maxId = maxBy(posts, post => post.id);
      const newPost = {
         id: maxId + 1,
         venueId: VENUE_ID,
         created: date.toISOString(),
         title,
         text,
         voteCount: 0,
         voteRating: 0,
         myVote: 0,
         isMy: true,
      };

      configurePostRoute(newPost);
      store.dispatch(createDemoPost(newPost));
      return [200, newPost];
   });
   mock.onPost(`/venues/${VENUE_ID}/mink`).reply(config => {
      const { question, answer } = JSON.parse(config.data);
      const date = new Date();
      const minks = selectDemoMinks(store.getState());
      const maxId = maxBy(minks, mink => mink.id);
      const newMink = {
         id: maxId + 1,
         created: date.toISOString(),
         question,
         answer,
         voteRating: 0,
         voteCount: 0,
         myCorrectAnswer: null,
         myVote: 0,
      };

      configureMinkRoute(newMink);
      store.dispatch(createDemoMink(newMink));
      return [200, newMink];
   });

   const { minks, posts, rateTags } = selectDemoData(store.getState());
   minks.forEach(mink => {
      configureMinkRoute(mink);
   });
   posts.forEach(post => {
      configurePostRoute(post);
   });
   rateTags.forEach(tag => {
      configureRateTagRoute(tag);
   });
}
