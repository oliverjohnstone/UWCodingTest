var bootstrap = require('./src/bootstrap')
  , app = require('express')()
  , port = 8080

bootstrap(app)

app.listen(port)