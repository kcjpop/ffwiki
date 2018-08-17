const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base')

module.exports = merge(base, {
  entry: {
    client: path.resolve(__dirname, './src/client.js')
  },
  devtool: 'inline-source-map'
})
