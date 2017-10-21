var webpack = require("webpack");

module.exports = {
    output: {
      filename: 'app.js'
    },
    plugins: [
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
      })
    ],
    module: {
      rules: [{
              test: require.resolve('jquery'),
              use: [{
                  loader: 'expose-loader',
                  options: '$'
              }]
          }]
    },
    externals: {
        charts: 'google.charts'
    }
}