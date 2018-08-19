import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import * as Articles from '@/modules/articles'
import * as Pages from '@/modules/pages'
import isBrowser from '@/helpers/isBrowser'

const browser = isBrowser()

const reduxMiddlewares = [thunk, browser ? logger : null].filter(Boolean)

// Create Redux store
export const store = createStore(
  combineReducers({
    articles: Articles.reducer
  }),
  browser && window.__REDUX_DATA__ ? window.__REDUX_DATA__ : undefined,
  applyMiddleware(...reduxMiddlewares)
)

// Combine all routes
export const routes = [...Articles.routes, ...Pages.routes]
