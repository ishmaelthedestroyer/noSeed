app.config [
  '$stateProvider'
  'noAuthProvider'
  ($stateProvider, Auth) ->
    $stateProvider.state 'signup',
      url: '/signup'
      templateUrl: '/routes/signup/views/signup.html'
      resolve:
        Auth: Auth.auth
          authKey: 'user'
          reqAuth: false
          redirAuth: 'index'
]