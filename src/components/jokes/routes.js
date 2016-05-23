module.exports = function jokeRoutes (serviceLocator) {
  serviceLocator.router.get('/v1/jokes', function (req, res, next) {
    var skip = req.query.skip || 0
      , limit = req.query.limit || 25

    serviceLocator.jokesRepository.getJokes(skip, limit, function (err, jokes) {
      if (err) {
        // TODO add error checking
        return next(err)
      }

      res.status(200).json(constructResponse(skip, limit, jokes))
    })
  })

  function constructResponse (skip, limit, jokes) {
    return (
      { pagination:
        { limit: limit
        , skip: skip
        , showing: jokes.length
        }
      , data: jokes
      })
  }
}