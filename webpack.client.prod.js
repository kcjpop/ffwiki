const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.client')

module.exports = merge(base, {
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
})
