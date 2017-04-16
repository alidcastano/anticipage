'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = anticipage;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _markovchain = require('markovchain');

var _markovchain2 = _interopRequireDefault(_markovchain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var total = 0,
    top = 0,
    settings = 0,
    projects = 0;

function anticipage(req, res, next) {
    if (req.path === '/favicon.ico') {
        next();
        return;
    }

    console.log(req.path);

    var quotes = new _markovchain2.default(_fs2.default.readFileSync('./user1.txt', 'utf8')),
        nextRoute = quotes.start(req.url).end(1).process().split(' ')[1];

    if (nextRoute === '/top') top++;else if (nextRoute === '/settings') settings++;else if (nextRoute === '/projects') projects++;
    total++;

    console.log('Settings: ' + settings / total);
    console.log('Projects: ' + projects / total);
    console.log('Top: ' + top / total);

    next();
}