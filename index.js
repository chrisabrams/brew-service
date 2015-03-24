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

    this.server.use(bodyParser.urlencoded({extended: true}))
    this.server.use(bodyParser.json({strict: false}))
    this.server.use(cookieParser())

    this.server.use( (req, res, next) => {

      var url = req.protocol + '://' + req.get('host') + req.originalUrl

      console.log('\n', req.method, url, '\n', req.body, '\n')

      next()

    })

  }

  loadRoutes(options = {}) {

    var routes = require(path.join(process.cwd(), this.routesPath))

    routes(this.server, options)

  }

  log() {
    console.log.apply(console, arguments)
  }

  start(options = {}) {

    this.loadRoutes(options)

    this.server.listen(this.port)
    console.log("Service", this.serviceName, "is listening on", this.port)

  }

}

module.exports = BrewService
