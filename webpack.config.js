const path = require('path');

module.exports = {
  entry: './build/src/index.js',
  output: {
    path: path.resolve(__dirname, 'build/app'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};