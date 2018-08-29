/* global test, expect, afterAll */
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { render } from 'react-testing-library'
import List from '../List'

afterAll(() => (global.__REDUX_DATA__ = undefined))

test('to render Article List without any problem', () => {
  const articles = {
    list: [{ id: 1, title: 'hello' }, { id: 2, title: 'foo bar' }],
    byId: { 1: { id: 1, title: 'hello' }, 2: { id: 2, title: 'foo bar' } },
    content: {}
  }

  global.__REDUX_DATA__ = { articles }
  const { store } = require('@/bootstrap')
  const { debug, container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <List />
      </BrowserRouter>
    </Provider>
  )

  expect(container.querySelectorAll('ul > li').length).toBe(2)
})
