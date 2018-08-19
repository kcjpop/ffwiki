import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import * as Articles from '@/modules/articles'
import * as Pages from '@/modules/pages'

// Create Redux store
export const store = createStore(
  combineReducers({
    articles: Articles.reducer
  }),
  applyMiddleware(thunk, logger)
)

// Combine all routes
export const routes = [...Articles.routes, ...Pages.routes]
