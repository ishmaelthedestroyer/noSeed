module.exports = (app) ->
  Logger = new (require '../../lib/logger')
  express = require 'express'
  passport = require 'passport'
  redisCONFIG = require '../../config/app/redis'

  app.configure ->
    # performance
    app.use express.compress
      filter: (req, res) ->
        (/json|text|javascript|css/).test res.getHeader 'Content-Type'
      level: 9

    # cache
    app.use (req, res, next) ->
      ###
      if req.url.indexOf('/css/') isnt -1 || req.url.indexOf('/js/') isnt -1 ||
        || req.url.indexOf('/img/') isnt -1
      ###
      res.setHeader 'Cache-Control', 'public, max-age=2592000'
      res.setHeader 'Expires',
        new Date(Date.now() + 2592000000).toUTCString()

      next()

    ###
    app.use express.favicon __dirname + '/public/favicon.ico',
      maxAge: 2592000000 # 30 day cache
    ###

    app.use express.static __dirname + '/../../public',
      maxAge: 2592000000 # 30 day cache

    app.use express.cookieParser()
    app.use express.json()
    app.use express.urlencoded()
    app.use express.methodOverride()

    # sessions w/ redis + passport
    app.use express.session
      store: redisCONFIG.sessionStore
      secret: redisCONFIG.secret
      cookie: redisCONFIG.cookie

    # authenticate with passport
    app.use passport.initialize()
    app.use passport.session()

    app.use app.router
