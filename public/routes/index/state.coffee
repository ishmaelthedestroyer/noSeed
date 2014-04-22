app.config [
  '$stateProvider'
  ($stateProvider) ->
    $stateProvider.state 'index',
      url: '/'
      templateUrl: '/routes/index/views/index.html'
]