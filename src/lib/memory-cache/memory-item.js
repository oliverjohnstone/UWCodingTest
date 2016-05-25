module.exports = MemoryItem

function MemoryItem (value, ttl) {
  this.value = value
  this.revalidate(ttl)
}

MemoryItem.prototype.isValid = function () {
  return (new Date()).getTime() < this.expiry
}

MemoryItem.prototype.revalidate = function (ttl) {
  this.expiry = (new Date()).getTime() + (ttl * 60000)
}