var CacheableRepository = require('../lib/cacheable-repository')
  , constructServerError = require('../lib/construct-server-error')

module.exports = Repository

function Repository (serviceLocator, jokeApi) {
  CacheableRepository.call(this, serviceLocator)
  this.api = jokeApi
}

Repository.prototype = Object.create(CacheableRepository.prototype)

Repository.prototype.getRandomJoke = function (cb) {
  this.api.getRandomJoke(function (err, joke) {
    if (err) return cb(err)

    var jokeObj = { id: this.getCacheKey(joke), joke: joke }
    this.cache(jokeObj.id, jokeObj, 10, function (err) {
      return cb(err ? constructServerError('Error caching joke') : null, jokeObj)
    })
  }.bind(this))
}

Repository.prototype.getJoke = function (id, cb) {
  this.getCacheItem(id, function (err, joke) {
    if (err) return cb(constructServerError('Error reading cache'))
    if (!joke) return cb(constructServerError('Joke not found in cache', 404))

    return cb(null, joke)
  })
}