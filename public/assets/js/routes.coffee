app.config [
  '$stateProvider'
  '$urlRouterProvider'
  '$locationProvider'
  ($stateProvider, $urlRouterProvider, $locationProvider) ->
    $urlRouterProvider.otherwise '/404'
    $locationProvider.html5Mode true
]