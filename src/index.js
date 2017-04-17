import fs from 'fs'
import { isFileSync } from './util'
import MarkovChain from 'markovchain'
import logRoute, { path } from './logger'

var total = 0,
    top = 0,
    settings = 0,
    projects = 0,
    prevRoute = null

export default function anticipage (opts) {
  return function (req, res, next) {
    const user = req.ip
    const currRoute = req.path

    if (currRoute === '/favicon.ico') {
      next()
      return
    } else if (!prevRoute) {
      prevRoute = currRoute
    } else if (currRoute !== prevRoute) {
      logRoute(user, prevRoute, currRoute)
      prevRoute = currRoute
    }

    if (isFileSync(path)) {
      var quotes = new MarkovChain(fs.readFileSync(path, 'utf8')),
          nextRoute = quotes.start(req.url).end(1).process().split(' ')[1]

      if (nextRoute === '/top') top++
      else if (nextRoute === '/settings') settings++
      else if (nextRoute === '/projects') projects++
      total++

      console.log('Settings: ' + settings / total)
      console.log('Projects: ' + projects / total)
      console.log('Top: ' + top / total)
    }

    next()
  }
}

// With a multi-node architecture you need to sync the data across nodes in order to
// build the Markov Chain on all of the data
/*
  function syncNodes () {

  }
*/
