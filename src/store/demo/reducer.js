import { actionTypes } from './actions';

const initialState = {
   data: {},
   isDemoing: false,
   mockAdapter: null,
};

export function reducer(state = initialState, action) {
   switch (action.type) {
      case actionTypes.TURN_DEMO_ON:
         return {
            ...state,
            isDemoing: true,
         };
      case actionTypes.CREATE_DEMO_MINK: {
         const { payload: mink } = action;
         return {
            ...state,
            data: {
               ...state.data,
               minks: state.data.minks.concat(mink),
            },
         };
      }
      case actionTypes.CREATE_DEMO_POST: {
         const { payload: post } = action;
         return {
            ...state,
            data: {
               ...state.data,
               posts: state.data.posts.concat(post),
            },
         };
      }
      case actionTypes.RATE_DEMO_TAG: {
         const { payload: ratedTag } = action;
         const rateTags = state.data.rateTags.map(tag => (tag.definitionId === ratedTag.definitionId ? ratedTag : tag));
         return {
            ...state,
            data: {
               ...state.data,
               rateTags,
            },
         };
      }
      case actionTypes.VOTE_DEMO_POST: {
         const { payload: votedPost } = action;
         const posts = state.data.posts.map(post => (post.id === votedPost.id ? votedPost : post));
         return {
            ...state,
            data: {
               ...state.data,
               posts,
            },
         };
      }
      case actionTypes.VOTE_DEMO_MINK: {
         const { payload: votedMink } = action;
         const minks = state.data.minks.map(mink => (mink.id === votedMink.id ? votedMink : mink));
         return {
            ...state,
            data: {
               ...state.data,
               minks,
            },
         };
      }
      case actionTypes.SET_DEMO_DATA: {
         const { payload: data } = action;
         return {
            ...state,
            data,
         };
      }
      case actionTypes.SET_DEMO_MOCK_ADAPTER: {
         const { payload: mockAdapter } = action;
         return {
            ...state,
            mockAdapter,
         };
      }
      case actionTypes.TURN_DEMO_OFF: {
         return {
            data: {},
            isDemoing: false,
            mockAdapter: null,
         };
      }
      default:
         return state;
   }
}
