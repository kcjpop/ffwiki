import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const dom = document.getElementById('app')

dom && ReactDOM.hydrate(<App />, dom)
