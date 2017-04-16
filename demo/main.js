var resolve = require('path').resolve,
    express = require('express'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('../webpack.config'),
    fs = require('fs'),
    MarkovChain = require('markovchain'),
    port = process.env.PORT || 8080,
    projectRoot = resolve(__dirname, '..'),
    anticipage = require('../src/index');
    
const compiler = webpack(config),
      app = express(),
      router = express.Router()

router.get('/', function (req, res, next) {
  console.log('ID:', req.params.id)
  next()
});

var top = 0;
var settings = 0;
var projects = 0;
var total = 0;

router.get('/*', function(req, res, next) {
  quotes = new MarkovChain(fs.readFileSync('./user1.txt', 'utf8'));
  next  = quotes.start(req.url).end(1).process().split(' ')[1];
  if (next === '/top') {
    top++;
  }
  else if (next === '/settings') {
    settings++;
  }
  else if (next === '/projects') {
    projects++;
  }
  total++;
  console.log('settings: ' + settings/total);
  console.log('projects: ' + projects/total);
  console.log('top: ' + top/total);
  res.send('success');
});

app.use(router)
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
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`);
});
