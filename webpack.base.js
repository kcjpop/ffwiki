const path = require('path')
const resolve = (...args) => path.resolve(__dirname, ...args)

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  output: {
    path: resolve('dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
