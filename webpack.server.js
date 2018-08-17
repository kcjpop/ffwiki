const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base')

const nodeExternals = require('webpack-node-externals')

const resolve = (...args) => path.resolve(__dirname, ...args)

module.exports = merge(base, {
  target: 'node',
  entry: {
    server: resolve('src/server.js')
  },
  externals: [nodeExternals()],
  devtool: 'inline-source-map'
})
