module.exports = (app) ->
  SessionCtrl = require '../../app/controllers/session'
  app.get '/api/session', SessionCtrl.load

  ###
  UserCtrl = require '../../app/controllers/user'
  app.get '/api/users', UserCtrl.list
  app.post '/api/users', UserCtrl.create
  app.get '/api/users/:id', UserCtrl.find
  app.post '/api/users/:id', UserCtrl.update
  app.delete '/api/users/:id', UserCtrl.delete
  ###