var request = require('request')
  , constructServerError = require('../lib/construct-server-error')

module.exports = JokeApi

function JokeApi(apiUrl) {
  this.apiUrl = apiUrl
}

JokeApi.prototype.getRandomJoke = function (cb) {
  var url = this.apiUrl + '/jokes/random'
  request({ url: url, timeout: 2000, json: true }, function (err, res, body) {
    if (!err && res.statusCode == 200) return cb(null, body.value.joke)
    return cb(constructServerError(err, res.statusCode))
  })
}