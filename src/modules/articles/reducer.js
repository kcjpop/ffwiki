import keyBy from 'lodash/keyBy'
import { LOAD_LIST, SET_CONTENT } from './actions'

export default function(
  state = {
    list: [],
    byId: {},
    content: {}
  },
  { type, payload }
) {
  switch (type) {
    case LOAD_LIST:
      return Object.assign({}, state, {
        list: payload.list,
        byId: keyBy(payload.list, item => item.id)
      })
    case SET_CONTENT:
      const content = Object.assign({}, state.content, {
        [payload.id]: payload.content
      })
      return Object.assign({}, state, { content })
    default:
      return state
  }
}
