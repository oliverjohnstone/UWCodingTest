var hash = require('object-hash')

module.exports = CacheableRepository

function CacheableRepository (serviceLocator) {
  this.serviceLocator = serviceLocator
}

CacheableRepository.prototype.cache = function (key, value, ttl, cb) {
  this.serviceLocator.cache.set(key, ttl, value, cb)
}

CacheableRepository.prototype.getCacheItem = function (key, cb) {
  this.serviceLocator.cache.get(key, cb)
}

CacheableRepository.prototype.getCacheKey = function (object) {
  return hash.MD5(object)
}