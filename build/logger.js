'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.path = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = logRoute;

var _util = require('./util');

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stringify = _stringify2.default,
    parse = JSON.parse;
var path = exports.path = 'routeData.json';

function logRoute(user, prevRoute, currRoute) {
  if (!(0, _util.isFileSync)(path)) (0, _fs.writeFile)(path, stringify({}));
  var fileData = parse((0, _fs.readFileSync)(path).toString());
  if (!fileData[user]) fileData[user] = {};

  var userData = fileData[user];
  if (!userData[prevRoute]) userData[prevRoute] = {};

  var routeData = userData[prevRoute];
  if (!routeData[currRoute]) routeData[currRoute] = 1;else routeData++;

  fileData.userData = userData;
  var updatedData = (0, _stringify2.default)(fileData);
  (0, _fs.writeFile)(path, updatedData, function (error) {
    if (error) console.error('write error:  ' + error.message);
  });
}