var resolve = require('path').resolve,
    express = require('express'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('../webpack.config')

const compiler = webpack(WebpackConfig),
      app = express(),
      port = process.env.PORT || 8080

app.use(new WebpackDevServer(compiler, {
  hot: true,
  historyApiFallback: true,
  stats: {
   colors: true,
   chunks: false
 }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

module.exports = app.listen(port, 'localhost', function (err, result) {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
});
