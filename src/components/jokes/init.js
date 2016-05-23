var initRepository = require('./repository')
  , initRoutes = require('./routes')
  , JokeApi = require('./api')

module.exports = function initJokes (serviceLocator) {
  initRepository(serviceLocator, new JokeApi(serviceLocator.config.apiUrl))
  initRoutes(serviceLocator)
}