import path from 'path'
import fs from 'fs'

import express from 'express'
import serveStatic from 'serve-static'
import browserSync from 'browser-sync'

import React from 'react'
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

function htmlTemplate(reactDom, manifest) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Final Fantasy Simple Wiki</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tachyons/4.11.1/tachyons.min.css" />
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

  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(htmlTemplate(renderToString(jsx), MANIFEST))
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
