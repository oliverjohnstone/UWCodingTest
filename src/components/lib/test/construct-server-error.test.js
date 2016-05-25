var assert = require('assert')
  , constructServerError = require('../construct-server-error')

describe('constructServerError', function () {
  it('should export a function', function () {
    assert.equal(typeof constructServerError, 'function')
  })

  it('should return an instance of Error', function () {
    assert(constructServerError('hello') instanceof Error)
  })

  it('should use a default status code', function () {
    assert.equal(constructServerError('hello').status, 500)
  })

  it('should use the status code provided', function () {
    assert.equal(constructServerError('hello', 404).status, 404)
  })

  it('should use the message provided', function () {
    assert.equal(constructServerError('hello').message, 'hello')
  })
})