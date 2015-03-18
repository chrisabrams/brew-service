var bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    express      = require('express'),
    path         = require('path')

class BrewService {

  constructor(options = {}) {

    this.options = options
    this.port    = (process.env.NODE_PORT || this.options.port || this.port || 9010)
    this.routesPath = './service/routes'

    if(this.options.paths) {

      if(this.options.paths.routes) {
        this.routesPath = this.options.paths.routes
      }

    }

    this.server  = express()

    this.server.use(bodyParser.json())
    this.server.use(cookieParser())

    this.loadRoutes()
  }

  loadRoutes() {

    var routes = require(path.join(process.cwd(), this.routesPath))

    routes(this.server)

  }

  log() {
    console.log.apply(console, arguments)
  }

  start() {

    this.server.listen(this.port)
    console.log("Service", this.serviceName, "is listening on", this.port)

  }

}

module.exports = BrewService
