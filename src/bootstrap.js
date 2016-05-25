var ServiceLocator = require('service-locator')
  , glob = require('glob')
  , componentPath = __dirname + '/components/*/init.js'
  , config = require('../config.json')
  , MemoryCache = require('./lib/memory-cache/memory-cache')

module.exports = function bootstrap(router) {
  var serviceLocator = new ServiceLocator()

  serviceLocator.register('router', router)
  serviceLocator.register('logger', { log: console.log })
  serviceLocator.register('config', config[process.env.NODE_ENV || 'development'])
  serviceLocator.register('cache', new MemoryCache())

  loadComponents(function (err) {
    if (err) {
      return process.exit()
    }

    registerErrorHandler()
  })

  function loadComponents(cb) {
    glob(componentPath, function (err, files) {
      if (err) {
        serviceLocator.logger.log('Error loading components')
        return cb(err)
      }

      files.map(function (file) {
        require(file)(serviceLocator)
      })

      cb()
    })
  }

  function registerErrorHandler() {
    var handleStatues = [ 400, 404 ]

    router.use(function (error, req, res, next) {
      if (error instanceof Error && !res.headerSent && handleStatues.indexOf(error.status)) {
        serviceLocator.logger.log('Error: ' + error.message)
        return res.status(error.status).json({ error: error.message })
      }

      return next(error)
    })
  }
}