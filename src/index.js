var fs = require('fs')
    MarkovChain = require('markovchain')

var top = 0
var settings = 0
var projects = 0
var total = 0

function anticipage(req, res) {
    var quotes = new MarkovChain(fs.readFileSync('./user1.txt', 'utf8'));
    nextRoute  = quotes.start(req.url).end(1).process().split(' ')[1];
    if (nextRoute === '/top') {
        top++;
    }
    else if (nextRoute === '/settings') {
        settings++;
    }
    else if (nextRoute === '/projects') {
        projects++;
    }
    total++;
    console.log('settings: ' + settings/total);
    console.log('projects: ' + projects/total);
    console.log('top: ' + top/total);
    res.send('success');
}

module.exports = anticipage
