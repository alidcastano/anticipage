// import fs from 'fs'
// import { isFileSync } from './util'
import MarkovChain from './markovchain'
// import logRoute, { path } from './logger'
/* var total = 0,
    top = 0,
    settings = 0,
    projects = 0,
    prevRoute = null,
*/
var db = require('./db');
var chain = loadChain();
var routeLog = {'global': ''}

function logRoutes(currRoute, user) {
  routeLog['global'] += currRoute + ' '
  if (Object.keys(routeLog).includes(user)) {
    routeLog[user] += currRoute + ' '
  } else {
    routeLog[user] = currRoute
  }
}

function loadChain() {
  db.get('global', {valueEncoding: 'json'}, function(err, routes) {
    chain = new MarkovChain(routes);
  });
}

// Fetch the model from the database
function updateChain() {
  chain.parse(routeLog['global']);
  db.put('global', quotes.wordBank, {valueEncoding: 'json'}, function(err, value) {
    if (err) {
      console.log(err);
      return next();
    }
    next();
  });
  routeLog = {'global': ''}
}

export default function anticipage (opts) {
  return function (req, res, next) {
    const user = req.ip
    const currRoute = req.path

    if (currRoute === '/favicon.ico') return next()

    // Log the current route, and if the log is sufficiently large then update 
    // the model and write it to disk
    logRoutes(currRoute, user);
    if (routeLog['global'].length > 100) {
      updateChain();
    }
    else {
      next();
    }

    /*
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
    */
  }
}

// With a multi-node architecture you need to sync the data across nodes in order to
// build the Markov Chain on all of the data
/*
  function syncNodes () {

  }
*/
