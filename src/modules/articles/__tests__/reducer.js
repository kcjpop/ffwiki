/* global test, expect */

import reducer from '../reducer'
import { LOAD_LIST, SET_CONTENT } from '../actions'

test('handle article list after done fetching', () => {
  const list = [
    { id: 1, title: 'Final Fantasy' },
    { id: 2, title: 'Final Fantasy II' },
    { id: 3, title: 'Final Fantasy III' }
  ]

  const state = reducer(undefined, {
    type: LOAD_LIST,
    payload: { list }
  })

  expect(state.list).toEqual(list)
  expect(state.byId[1]).toEqual(list[0])
  expect(state.byId[2]).toEqual(list[1])
  expect(state.byId[3]).toEqual(list[2])
})

test('set content of an article', () => {
  const payload = {
    id: 1,
    content: {
      sections: [
        { title: 'Title 1', content: 'Lorem ipsum' },
        { title: 'Title 2', content: 'Dolor sit amet' }
      ]
    }
  }

  const state = reducer(undefined, { type: SET_CONTENT, payload })
  expect(state.content[1]).toEqual(payload.content)
})
