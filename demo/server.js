var resolve = require('path').resolve,
    express = require('express'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('../webpack.config'),
    port = process.env.PORT || 8080,
    projectRoot = resolve(__dirname, '..'),
    anticipage = require('../src/index');


const compiler = webpack(config),
      app = express(),
      router = express.Router()


app.use(anticipage);
app.use(router);

app.use(webpackHotMiddleware(compiler))
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  historyApiFallback: true,
  stats: {
   colors: true,
   chunks: false
 }
}))


// app.use(express.static(__dirname))

module.exports = app.listen(port, 'localhost', function (err, result) {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
