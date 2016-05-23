var request = require('request')

module.exports = JokeApi

function JokeApi(apiUrl) {
  this.apiUrl = apiUrl
}

JokeApi.prototype.getJoke = function (id, cb) {
  return cb({ test: 'bob' })
}