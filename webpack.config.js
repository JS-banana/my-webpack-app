const { resolve } = require('path')
const requirePath = (path) => resolve(__dirname, './webpack/', path)

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: requirePath('loaderA.js'),
            options: {
              msg: 'i am loaderA',
            },
          },
          {
            loader: requirePath('loaderB.js'),
            options: {
              msg: 'i am loaderB',
            },
          },
        ],
      },
    ],
  },
}
