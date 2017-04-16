'use strict';

var fs = require('fs');

function logData(path, data) {
  fs.writeFile(path, data, function (error) {
    if (error) console.error('write error:  ' + error.message);
  });
}

logData('Test.txt', 'Hello');