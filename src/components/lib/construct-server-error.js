module.exports = function constructServerError(msg, status) {
  var error = new Error(msg)
  error.status = status || 500
  return error
}