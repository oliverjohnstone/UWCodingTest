var Repository = require('./repository')
  , initRoutes = require('./routes')
  , JokeApi = require('./api')

module.exports = function initJokes (serviceLocator) {
  serviceLocator.register('jokesRepository'
    , new Repository(serviceLocator, new JokeApi(serviceLocator.config.apiUrl))
  )

  initRoutes(serviceLocator)
}