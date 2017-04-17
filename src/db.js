var level = require('level'),
    path = require('path'),
    dbPath = process.env.DB_PATH || path.join(__dirname, 'markovchain'),
    db = level(dbPath)

module.exports = db
