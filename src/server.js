import path from 'path'
import fs from 'fs'

import express from 'express'
import serveStatic from 'serve-static'
import browserSync from 'browser-sync'

import React from 'react'
import Helmet from 'react-helmet'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'

import App from '@/App'

const PRODUCTION = process.env.NODE_ENV === 'production'
const PORT = 3000

// Read client manifest file
const MANIFEST = !PRODUCTION ? {} : readManifestFile()

function readManifestFile() {
  const p = path.resolve('./dist/manifest.json')
  if (!fs.existsSync(p)) throw Error(`Cannot read manifest from path ${p}`)

  return JSON.parse(fs.readFileSync(p))
}

function getManifestFile(manifest, path) {
  return manifest[path] || `/${path}`
}

function htmlTemplate(reactDom, { manifest, helmet }) {
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
  <script src="${getManifestFile(manifest, 'client.js')}"></script>
  <script src="${getManifestFile(manifest, 'vendors~client.js')}"></script>
</body>
</html>`
}

const app = express()

app.use(serveStatic(path.resolve('dist')))

app.get('/*', (req, res) => {
  const context = {}
  const jsx = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  )
  const reactDom = renderToString(jsx)
  const helmet = Helmet.renderStatic()

  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(
    htmlTemplate(reactDom, {
      helmet,
      manifest: MANIFEST
    })
  )
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
