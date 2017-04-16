const anticipage = require('../src/index')

module.exports = function (router) {
  router.get('/*', function(req, res, next) {
    anticipage(req, res)
    next()
  })
}
