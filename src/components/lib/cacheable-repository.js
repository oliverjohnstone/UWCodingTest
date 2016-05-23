module.exports = CacheableRepository

function CacheableRepository (serviceLocator) {
  this.serviceLocator = serviceLocator
}

CacheableRepository.prototype.cache = function (key, ttl, value) {
  this.serviceLocator.cache.set(key, ttl, value)
}

CacheableRepository.prototype.getCacheItem = function (key, cb) {
  this.serviceLocator.cache.get(key, cb)
}