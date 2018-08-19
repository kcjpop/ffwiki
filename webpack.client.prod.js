const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.client')

const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = merge(base, {
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [new ManifestPlugin()]
})
