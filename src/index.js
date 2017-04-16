var MarkovChain = require('markovchain'),
  fs = require('fs')

var total = 0, top = 0, settings = 0, projects = 0

function anticipage(req, res, next) {
  if (req.path === "/favicon.ico") {
      return next()
  }

  var quotes = new MarkovChain(fs.readFileSync('./user1.txt', 'utf8'))
  var nextRoute = quotes.start(req.url).end(1).process().split(' ')[1]
  if (nextRoute === '/top') {
    top++
  }
  else if (nextRoute === '/settings') {
    settings++
  }
  else if (nextRoute === '/projects') {
    projects++
  }
  total++
  console.log('settings: ' + settings/total)
  console.log('projects: ' + projects/total)
  console.log('top: ' + top/total)
  res.send('success')
  next()
}

module.exports = anticipage