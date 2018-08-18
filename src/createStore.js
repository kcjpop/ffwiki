import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

export default function(reducers) {
  return createStore(reducers, applyMiddleware(thunk, logger))
}
