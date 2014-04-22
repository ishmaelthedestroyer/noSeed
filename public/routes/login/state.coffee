app.config [
  '$stateProvider'
  'noAuthProvider'
  ($stateProvider, Auth) ->
    $stateProvider.state 'login',
      url: '/login'
      templateUrl: '/routes/login/views/login.html'
      resolve:
        Auth: Auth.auth
          authKey: 'user'
          reqAuth: false
          redirAuth: 'index'
]