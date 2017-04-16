'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = anticipage;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _util = require('./util');

var _markovchain = require('markovchain');

var _markovchain2 = _interopRequireDefault(_markovchain);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var total = 0,
    top = 0,
    settings = 0,
    projects = 0,
    prevRoute = null;

function anticipage(req, res, next) {
  var user = req.ip;
  var currRoute = req.path;

  if (currRoute === '/favicon.ico') {
    next();
    return;
  } else if (!prevRoute) {
    prevRoute = currRoute;
  } else if (currRoute !== prevRoute) {
    (0, _logger2.default)(user, prevRoute, currRoute);
    prevRoute = currRoute;
  }

  if ((0, _util.isFileSync)(_logger.path)) {
    var quotes = new _markovchain2.default(_fs2.default.readFileSync(_logger.path, 'utf8')),
        nextRoute = quotes.start(req.url).end(1).process().split(' ')[1];

    if (nextRoute === '/top') top++;else if (nextRoute === '/settings') settings++;else if (nextRoute === '/projects') projects++;
    total++;

    console.log('Settings: ' + settings / total);
    console.log('Projects: ' + projects / total);
    console.log('Top: ' + top / total);
  }

  next();
}