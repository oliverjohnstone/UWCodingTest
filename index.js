var bootstrap = require('./src/bootstrap')
  , app = require('express')()
  , port = 8080

bootstrap(app)

app.listen(port)

// I've used this simple logging for ease of implementation and portability but I'd prefer to use
// a more advanced logger
console.log('Process running on: http://localhost:' + port)