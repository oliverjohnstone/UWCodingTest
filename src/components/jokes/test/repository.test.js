var assert = require('assert')
  , Repository = require('../repository')
  , sinon = require('sinon')
  , noop = function () {}

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
    var mockSl = { cache: { set: sinon.spy(), get: sinon.spy() } }
      , repo = new Repository(mockSl, {})
    
    repo.getJoke(1, function (err) {
      assert.ifError(err)

      assert.equal(mockSl.cache.get.calledOnce, true)
      done()
    })
  })

  it('should make a call to the joke api when the joke can\'t be found in cache', function () {
    var mockSl = { cache: { set: noop, get: sinon.spy() } }
      , repo = new Repository(mockSl, {})

    repo.getJoke(1, function (err) {
      assert.ifError(err)

      assert.equal(mockSl.cache.get.calledOnce, true)
      done()
    })
  })

  it('should return a random joke', function () {

  })

  it('should return a list of jokes', function () {

  })
})