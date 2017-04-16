// seperate file for each IP address

const fs = require('fs')

function logData (path, data) {
  fs.writeFile(path, data, function (error) {
    if (error) console.error("write error:  " + error.message)
  })
}

logData('Test.txt', 'Hello')

// var wstream = fs.createWriteStream('myOutput.txt');
// wstream.write('Hello world!\n');
// wstream.write('Another line\n');
// wstream.end();
