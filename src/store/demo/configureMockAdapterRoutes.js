import maxBy from 'lodash/maxBy';
import orderBy from 'lodash/orderBy';

import { loadAggregateDataSuccess } from '../aggregate';
import { selectSelectedVenue, setVenueMinks, setVenuePosts, setVenueRates } from '../venues';
import { DEMO_VENUE_ID as VENUE_ID, DEMO_VENUE, DEMO_AGGREGATE } from './data';
import { mockCalculateRating } from './mockFunctions';
import { TABS_MAB } from '../venues/saga/privateShare';

export const RESPONSE_DELAY = 800;

export default function configureMockAdapterRoutes(mock, store) {
  const configureRateTagRoute = (tag) => {
    mock.onPost(`venues/${VENUE_ID}/rateTag/${tag.definitionId}/rate`).reply((config) => {
      const { rate } = JSON.parse(config.data);
      const ratedTag = {
        ...tag,
        voteCount: tag.voteCount + 1,
        voteRating: mockCalculateRating(rate, tag.voteRating),
        userRate: rate,
      };

      const venue = selectSelectedVenue(store.getState());
      const updatedRateTags = venue.rates.map((tag) =>
        tag.definitionId === ratedTag.definitionId ? ratedTag : tag,
      );
      // time the response with this to prevent the view from flickering
      setTimeout(() => {
        store.dispatch(setVenueRates(updatedRateTags));
      }, RESPONSE_DELAY);

      const updatedVenue = {
        ...venue,
        votesCount: venue.votesCount + 1,
        rating: mockCalculateRating(rate, venue.rating),
      };
      return [
        200,
        {
          venue: updatedVenue,
          venueRateTag: ratedTag,
        },
      ];
    });
  };

  const configureMinkRoute = (mink) => {
    mock.onPost(`venues/${VENUE_ID}/mink/${mink.id}/rate`).reply((config) => {
      const { vote } = JSON.parse(config.data);
      const votedMink = {
        ...mink,
        myCorrectAnswer: mink.answer,
        myVote: vote,
        voteCount: mink.voteCount + 1,
        voteRating: mockCalculateRating(vote, mink.voteRating),
      };
      const { minks } = selectSelectedVenue(store.getState());
      const updatedMinks = minks.map((mink) => (mink.id === votedMink.id ? votedMink : mink));
      store.dispatch(setVenueMinks(updatedMinks));
      return [200, votedMink];
    });

    mock.onPost(`venues/${VENUE_ID}/mink/${mink.id}/answer`).reply((config) => {
      const { answer } = JSON.parse(config.data);
      return [200, { isAnswerCorrect: answer === mink.answer }];
    });
  };

  const configurePostRoute = (post) => {
    mock.onPost(`venues/${VENUE_ID}/feedback/${post.id}/vote`).reply((config) => {
      const { vote } = JSON.parse(config.data);
      const votedPost = {
        ...post,
        voteCount: post.voteCount + 1,
        voteRating: mockCalculateRating(vote, post.voteRating),
      };

      const { posts } = selectSelectedVenue(store.getState());
      const updatedPosts = posts.map((post) => (post.id === votedPost.id ? votedPost : post));
      store.dispatch(setVenuePosts(updatedPosts));
      return [200, votedPost];
    });
  };

  const configurePrivateShareRoute = (tabItemId, tabType) => {
    if (tabType === 'venue') {
      mock.onPost(`Venues/${VENUE_ID}/share`).reply((config) => {
        return [200, {}];
      });
    }

    mock.onPost(`venues/${VENUE_ID}/${TABS_MAB[tabType]}/${tabItemId}/share`).reply((config) => {
      return [200, {}];
    });
  };

  mock.onGet('venues').reply((config) => {
    return [200, [DEMO_VENUE]];
  });

  mock.onGet('aggregate').reply((config) => {
    const date = new Date();
    return [
      200,
      {
        ...DEMO_AGGREGATE,
        insiderVenueIds: [VENUE_ID],
        date: date.toISOString(),
        timestamp: date.getTime(),
        isFormerInsider: true,
        isTermsAccepted: true,
        userId: '00000000-0000-0000-0000-000000000000',
      },
    ];
  });

  mock.onGet(`/venues/${VENUE_ID}/minks?orderBy=voteRating`).reply((config) => {
    const { minks } = selectSelectedVenue(store.getState());
    const orderedMinks = orderBy(minks, ['voteRating'], ['desc']);
    return [200, { minks: orderedMinks, totalCount: orderedMinks.length }];
  });

  mock.onGet(`/venues/${VENUE_ID}/rateTags`).reply((config) => {
    const { rates: rateTags } = selectSelectedVenue(store.getState());
    return [200, rateTags];
  });

  mock.onGet(`/venues/${VENUE_ID}/feedback?OrderBy=VoteCount`).reply((config) => {
    const { posts } = selectSelectedVenue(store.getState());
    const orderedPosts = orderBy(posts, ['voteCount'], ['desc']);
    return [200, { feedback: orderedPosts, totalCount: orderedPosts.length }];
  });

  mock.onGet(`venues/${VENUE_ID}/topmink`).reply((config) => {
    const { minks } = selectSelectedVenue(store.getState());
    const topMink = maxBy(minks, (mink) => mink.voteRating);
    return [200, topMink];
  });

  mock.onPost('/user/acceptTerms').reply((config) => [200, {}]);

  mock.onPost(`/venues/${VENUE_ID}/feedback`).reply((config) => {
    const { title, text } = JSON.parse(config.data);
    const date = new Date();
    const { posts } = selectSelectedVenue(store.getState());
    const { id } = maxBy(posts, (post) => post.id);
    const newPost = {
      id: id + 1,
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
    configurePrivateShareRoute(newPost.id, 'post');
    const updatedPosts = posts.concat(newPost);
    store.dispatch(setVenuePosts(updatedPosts));
    return [200, newPost];
  });

  mock.onPost(`/venues/${VENUE_ID}/mink`).reply((config) => {
    const { question, answer } = JSON.parse(config.data);
    const date = new Date();
    const { minks } = selectSelectedVenue(store.getState());
    const { id } = maxBy(minks, (mink) => mink.id);
    const newMink = {
      id: id + 1,
      created: date.toISOString(),
      voteRating: 0,
      voteCount: 0,
      myCorrectAnswer: undefined,
      myVote: 0,
      question,
      answer,
    };

    configureMinkRoute(newMink);
    configurePrivateShareRoute(newMink.id, 'mink');
    const updatedMinks = minks.concat(newMink);
    store.dispatch(setVenueMinks(updatedMinks));

    return [200, newMink];
  });

  store.dispatch(loadAggregateDataSuccess(DEMO_AGGREGATE));
  configurePrivateShareRoute(VENUE_ID, 'venue');
  DEMO_VENUE.minks.forEach((mink) => {
    configureMinkRoute(mink);
    configurePrivateShareRoute(mink.id, 'mink');
  });
  DEMO_VENUE.posts.forEach((post) => {
    configurePostRoute(post);
    configurePrivateShareRoute(post.id, 'post');
  });
  DEMO_VENUE.rates.forEach((rateTag) => {
    configureRateTagRoute(rateTag);
    configurePrivateShareRoute(rateTag.definitionId, 'rate');
  });
}
