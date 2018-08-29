/* global window */
import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import * as Articles from '@/modules/articles'
import * as Pages from '@/modules/pages'
import isBrowser from '@/helpers/isBrowser'
import req from '@/helpers/req'

const browser = isBrowser()

const reduxMiddlewares = [thunk, browser ? logger : null].filter(Boolean)

function getReduxInitData(browser) {
  const g = browser ? window : global

  return g.__REDUX_DATA__ ? g.__REDUX_DATA__ : undefined
}

// Create Redux store
export const store = createStore(
  combineReducers({
    articles: Articles.reducer
  }),
  getReduxInitData(browser),
  applyMiddleware(...reduxMiddlewares)
)

// Fetch initial data
store.dispatch(Articles.actions.loadGameList(req))

// Combine all routes
export const routes = [...Articles.routes, ...Pages.routes]
