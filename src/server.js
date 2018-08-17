import path from 'path'

import express from 'express'
import browserSync from 'browser-sync'

const serveStatic = require('serve-static')

import React from 'react'
import { renderToString } from 'react-dom/server'

import App from '@/App'

function htmlTemplate(reactDom) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Final Fantasy Simple Wiki</title>
</head>
<body>
  <div id="app">${reactDom}</div>
  <script src="/client.js"></script>
</body>
</html>`
}

const app = express()

const PRODUCTION = process.env.NODE_ENV === 'production'
const PORT = 3000

app.use(serveStatic(path.resolve('dist')))

app.get('/*', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(htmlTemplate(renderToString(<App />)))
})

app.listen(PORT, () => {
  if (!PRODUCTION) {
    const bs = browserSync.create()
    bs.init({
      files: ['../dist/**/*'],
      online: false,
      open: false,
      port: PORT + 1,
      proxy: 'localhost:' + PORT,
      ui: false
    })
  }
})
