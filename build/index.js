'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = anticipage;

var _markovchain = require('./markovchain');

var _markovchain2 = _interopRequireDefault(_markovchain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = require('./db');
var chain = loadChain();
var routeLog = { 'global': '' };

function logRoutes(currRoute, user) {
  routeLog['global'] += currRoute + ' ';
  if ((0, _keys2.default)(routeLog).includes(user)) {
    routeLog[user] += currRoute + ' ';
  } else {
    routeLog[user] = currRoute;
  }
}

function loadChain() {
  db.get('global', { valueEncoding: 'json' }, function (err, routes) {
    chain = new _markovchain2.default(routes);
  });
}

function updateChain() {
  chain.parse(routeLog['global']);
  db.put('global', quotes.wordBank, { valueEncoding: 'json' }, function (err, value) {
    if (err) {
      console.log(err);
      return next();
    }
    next();
  });
  routeLog = { 'global': '' };
}

function anticipage(opts) {
  return function (req, res, next) {
    var user = req.ip;
    var currRoute = req.path;

    if (currRoute === '/favicon.ico') return next();

    logRoutes(currRoute, user);
    if (routeLog['global'].length > 100) {
      updateChain();
    } else {
      next();
    }
  };
}