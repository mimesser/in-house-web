import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const initialState = {
  aggregate: null,
}

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AGGREGATE': {
      return { ...state, aggregate: action.aggregate };
    }
    default: {
      return state
    }
  }
}

export function initializeStore (state = initialState) {
  return createStore(
    reducer,
    state,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
