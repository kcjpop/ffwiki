/* global test, expect, afterAll */
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter, Switch, Route } from 'react-router-dom'
import { render } from 'react-testing-library'
import View from '../View'

afterAll(() => (global.__REDUX_DATA__ = undefined))

test('to render Article without any problem', () => {
  const articles = {
    list: [{ id: 1, title: 'hello', thumbnail: 'image.png' }],
    byId: { 1: { id: 1, title: 'hello', thumbnail: 'image.png' } },
    content: {
      1: {
        sections: [
          {
            title: 'Section 1',
            images: [],
            content: [{ type: 'paragraph', text: 'Lorem' }]
          },
          {
            title: 'Section 2',
            images: [],
            content: [{ type: 'paragraph', text: 'Ipsum' }]
          }
        ]
      }
    }
  }

  global.__REDUX_DATA__ = { articles }
  const { store } = require('@/bootstrap')
  const { container } = render(
    <MemoryRouter initialEntries={[{ pathname: '/games/1' }]} initialIndex={0}>
      <Provider store={store}>
        <Route path="/games/:id" component={View} />
      </Provider>
    </MemoryRouter>
  )

  expect(container != null).toBe(true)
})
