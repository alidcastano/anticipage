var MarkovChain = require('markovchain')
  , fs = require('fs')
  , quotes = new MarkovChain(fs.readFileSync('./user1.txt', 'utf8'))
 
console.log(quotes.start('/top').end(1).process());