var CacheableRepository = require('../lib/cacheable-repository')

module.exports = function initRepository (serviceLocator, jokeApi) {
  function Repository () {}

  Repository.prototype = new CacheableRepository()
  
  Repository.prototype.getRandomJoke = function () {
    
  }
  
  Repository.prototype.getJoke = function (id) {
    
  }
  
  Repository.prototype.getJokes = function (skip, limit, cb) {
    return cb(null, [ { test: 'bob' } ])
  }

  serviceLocator.register('jokesRepository', new Repository())
}
