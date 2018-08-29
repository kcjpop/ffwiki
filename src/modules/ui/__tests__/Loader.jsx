/* global test, expect */
import React from 'react'
import { render } from 'react-testing-library'
import Loader from '../Loader'

test('to render Loader without any problem', () => {
  const { container } = render(
    <Loader loading={true}>
      <p>Whatever</p>
    </Loader>
  )

  const spinner = container.querySelector('div.sk-rotating-plane')
  expect(spinner != null).toBe(true)
})

test('to show children element if not in loading state', () => {
  const { container } = render(
    <Loader loading={false}>
      <p>Whatever</p>
    </Loader>
  )
  const p = container.querySelector('p')
  expect(p != null).toBe(true)
  expect(p.textContent).toBe('Whatever')
})
