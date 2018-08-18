import { LOAD_GAME_LIST } from './actions'

export default function(
  state = {
    list: []
  },
  { type, payload }
) {
  switch (type) {
    case LOAD_GAME_LIST:
      return Object.assign({}, state, payload)
    default:
      return state
  }
}
