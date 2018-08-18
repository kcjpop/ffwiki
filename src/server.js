import path from 'path'

import express from 'express'
import serveStatic from 'serve-static'
import browserSync from 'browser-sync'

import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'

import App from '@/App'

function htmlTemplate(reactDom) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Final Fantasy Simple Wiki</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tachyons/4.11.1/tachyons.min.css" />
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
  const context = {}
  const jsx = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  )

  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(htmlTemplate(renderToString(jsx)))
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
