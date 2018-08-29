/* global jest, test, expect */
import { LOAD_LIST, SET_CONTENT, loadGameList, loadContent } from '../actions'

test('load list of articles', () => {
  const data = { items: [{ foo: 1 }, { bar: 2 }] }

  const get = jest.fn(() => new Promise((resolve, reject) => resolve({ data })))
  const req = { get }

  const dispatch = jest.fn(action =>
    expect(action).toEqual({
      type: LOAD_LIST,
      payload: { list: data.items }
    })
  )

  return loadGameList(req)(dispatch).then(() => {
    expect(get).toBeCalled()
    expect(dispatch).toBeCalled()
  })
})

test('set content of an article', () => {
  const data = 'whatever'
  const id = 1

  const get = jest.fn(() => new Promise((resolve, reject) => resolve({ data })))
  const req = { get }
  const dispatch = jest.fn(action =>
    expect(action).toEqual({
      type: SET_CONTENT,
      payload: { id, content: data }
    })
  )

  return loadContent(req, id)(dispatch).then(() => {
    expect(get).toBeCalled()
    expect(dispatch).toBeCalled()
  })
})
