var ServiceLocator = require('service-locator')
  , glob = require('glob')
  , componentPath = __dirname + '/components/*/init.js'
  , configury = require('configury')

module.exports = function bootstrap(router) {
  var serviceLocator = new ServiceLocator()

  serviceLocator.register('router', router)
  serviceLocator.register('logger', { log: console.log })
  serviceLocator.register('config', configury('../config.json', process.env.NODE_ENV || 'development'))

  loadComponents()
  registerErrorHandler()

  function loadComponents() {
    glob(componentPath, function (err, files) {
      if (err) {
        serviceLocator.logger.log('Error loading components')
        process.exit()
      }

      files.map(function (file) {
        require(file)(serviceLocator)
      })
    })
  }

  function registerErrorHandler() {
    var handleStatues = [ 400, 404 ]

    router.use(function (error, req, res, next) {
      if (error instanceof Error && !res.headerSent && handleStatues.indexOf(error.status)) {
        return res.status(error.status).json({ error: error.status })
      }

      return next(error)
    })
  }
}