var CacheItem = require('./memory-item')

module.exports = MemoryCache

function MemoryCache() {
  this.cache = []
}

MemoryCache.prototype.set = function (key, ttl, value, cb) {
  this.cache[key] = new CacheItem(value, ttl)
  cb()
}

MemoryCache.prototype.get = function (key, cb) {
  if (typeof this.cache[key] !== 'undefined' && this.cache[key].isValid()) {
    return cb(null, this.cache[key].value)
  }

  return cb()
}