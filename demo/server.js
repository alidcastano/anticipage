var resolve = require('path').resolve,
    express = require('express'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('../webpack.config')

const compiler = webpack(config),
      app = express(),
      router = express.Router()
      port = process.env.PORT || 8080

router.get('/', function (req, res, next) {
  console.log('hello')
  console.log('ID:', req.params.id)
  next()
}, function (req, res, next) {
  res.send('User Info')
})

app.use(webpackHotMiddleware(compiler))
app.use(router)

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
