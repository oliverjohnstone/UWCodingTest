module.exports = function jokeRoutes (serviceLocator) {
  serviceLocator.router.get('/v1/jokes/random', function (req, res, next) {

    serviceLocator.jokesRepository.getRandomJoke(function (err, joke) {
      if (err) return next(err)

      res.status(200).json(joke)
    })
  })
  
  serviceLocator.router.get('/v1/jokes/:id', function (req, res, next) {
    serviceLocator.jokesRepository.getJoke(req.params.id, function (err, joke) {
      if (err) return next(err)

      res.status(200).json(joke)
    })
  })
}