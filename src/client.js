import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const dom = document.getElementById('app')

dom &&
  ReactDOM.hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    dom
  )
