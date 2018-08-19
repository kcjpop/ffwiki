import path from 'path'
import fs from 'fs'

import express from 'express'
import serveStatic from 'serve-static'
import browserSync from 'browser-sync'

import React from 'react'
import Helmet from 'react-helmet'
import { StaticRouter, matchPath } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { Provider as ReduxProvider } from 'react-redux'

import { store, routes } from './bootstrap'

import App from '@/App'

const PRODUCTION = process.env.NODE_ENV === 'production'
const PORT = 3000

// Prepare frontend  manifest file

const MANIFEST = !PRODUCTION ? {} : readManifestFile()

function readManifestFile() {
  const p = path.resolve('./dist/manifest.json')
  if (!fs.existsSync(p)) throw Error(`Cannot read manifest from path ${p}`)

  return JSON.parse(fs.readFileSync(p))
}

function getManifestFile(manifest, path) {
  return manifest[path] || `/${path}`
}

function toHtml(reactDom, { manifest, helmet, redux }) {
  const vendors = PRODUCTION
    ? `<script src="${getManifestFile(
        manifest,
        'vendors~client.js'
      )}"></script>`
    : null

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tachyons/4.11.1/tachyons.min.css" />
  ${helmet.title.toString()}
  ${helmet.meta.toString()}
  ${helmet.link.toString()}
</head>
<body>
  <div id="app">${reactDom}</div>
  <script>
window.__REDUX_DATA__ = ${JSON.stringify(redux)}
  </script>
  <script src="${getManifestFile(manifest, 'client.js')}"></script>
  ${vendors}
</body>
</html>`
}

// Create express instance

const app = express()

app.use(serveStatic(path.resolve('dist')))

app.get('/*', (req, res) => {
  // Prefetch data to fill in Redux store
  const promises = routes
    .map(route => {
      const match = matchPath(req.url, route)
      return { match, route }
    })
    .filter(
      ({ match, route }) =>
        match != null && route.server && route.server.prefetchData
    )
    .map(({ match, route }) => route.server.prefetchData(store, match))

  return Promise.all(promises).then(() => {
    const context = {}
    const jsx = (
      <ReduxProvider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </ReduxProvider>
    )
    const reactDom = renderToString(jsx)
    const helmet = Helmet.renderStatic()
    const redux = store.getState()

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(
      toHtml(reactDom, {
        helmet,
        redux,
        manifest: MANIFEST
      })
    )
  })
})

app.listen(PORT, () => {
  if (!PRODUCTION) {
    const bs = browserSync.create()
    bs.init({
      files: ['../dist/**/*'],
      open: false,
      online: false,
      port: PORT + 1,
      proxy: 'localhost:' + PORT,
      ui: false
    })
  }
  console.log(`Server is running at http://localhost:${PORT}`)
})
