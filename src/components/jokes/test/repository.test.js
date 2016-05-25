var assert = require('assert')
  , Repository = require('../repository')
  , sinon = require('sinon')
  , nock = require('nock')
  , Api = require('../api')

describe('JokeRepository', function () {
  it('should export a function', function () {
    assert.equal(typeof Repository, 'function')
  })

  it('should have all expected functions', function () {
    var expectedFns = [ 'getRandomJoke', 'getJoke', 'cache', 'getCacheItem' ]
      , repo = new Repository({}, {})

    expectedFns.forEach(function (fnName) {
      assert.equal(typeof repo[fnName], 'function', 'should have function: ' + fnName)
    })
  })

  it('should make a call to the caching service', function (done) {
    var mockSl =
        { cache:
          { set: sinon.spy(function (key, ttl, value, cb) { return cb() })
          , get: sinon.spy(function (key, cb) { return cb() })
          }
        }
      , repo = new Repository(mockSl, {})

    repo.getJoke(1, function (err) {
      assert.equal(mockSl.cache.get.calledOnce, true)
      done()
    })
  })

  it('should return a random joke', function (done) {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .reply(200, {
        type: 'success',
        value: {
          id: 490,
          joke: 'Chuck Norris doesn\'t need to use AJAX because pages are too afraid to postback anyways.',
          categories: [ 'nerdy' ]
        }
      })

    var sl =
        { cache:
          { set: sinon.spy(function (key, ttl, value, cb) { return cb() })
            , get: sinon.spy(function (key, cb) { return cb() })
          }
        }
      , repo = new Repository(sl, new Api('https://api.icndb.com'))

    repo.getRandomJoke(function (err, joke) {
      assert.ifError(err)

      assert.deepEqual(joke
        , { id: '81099e44567e969d935e095bdaec5fdc'
          , joke: 'Chuck Norris doesn\'t need to use AJAX because pages are too afraid to postback anyways.'
          }
      )
      done()
    })
  })
})