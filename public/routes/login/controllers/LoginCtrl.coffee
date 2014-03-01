app.controller 'LoginCtrl', [
  '$scope', '$location', '$q', 'noSession', 'noQueue', 'noNotify', 'noLogger'
  ($scope, $location, $q, Session, Queue, Notify, Logger) ->
    $scope.working = false
    $scope.username = ''
    $scope.password = ''

    EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
    NUM_REGEXP = /\d/

    $scope.promptEmail = ''
    $scope.statusEmail = 'warning'
    $scope.validEmail = false
    $scope.validateEmail = () ->
      if !$scope.username.length
        $scope.promptEmail = ''
        $scope.statusEmail = 'warning'
        $scope.validEmail = false
        return 'empty'
      else if EMAIL_REGEXP.test $scope.username
        $scope.promptEmail = ''
        $scope.statusEmail = 'success'
        $scope.validEmail = true
        return 'valid'
      else
        $scope.promptEmail = 'Invalid email.'
        $scope.statusEmail = 'error'
        $scope.validEmail = false
        return 'Invalid email.'

    $scope.promptPassword = ''
    $scope.statusPassword = 'warning'
    $scope.validPassword = false
    $scope.validatePassword = () ->
      if !$scope.password.length
        $scope.promptPassword = ''
        $scope.statusPassword = 'warning'
        $scope.validPassword = false
        return 'empty'
      else if $scope.password.length < 7
        $scope.promptPassword = 'Your password must be at least 7 ' +
          'characters long.'
        $scope.statusPassword = 'error'
        $scope.validPassword = false
        return 'invalid'
      else if !NUM_REGEXP.test $scope.password
        $scope.promptPassword = 'Your password must contain at least ' +
          'one number.'
        $scope.statusPassword = 'error'
        $scope.validPassword = false
        return 'invalid'
      else
        $scope.promptPassword = ''
        $scope.statusPassword = 'success'
        $scope.validPassword = true
        return 'valid'

    $scope.login = () ->
      $scope.working = true
      deferred = $q.defer()
      Queue.push deferred.promise
      Logger.debug 'Attempting to sign in user.'

      Session.login(
        username: $scope.username
        password: $scope.password
      ).then (result) ->
        $scope.working = false
        deferred.resolve()
        Notify.push 'Login successful.', 'success', 3000
        $location.path '/'
      , () ->
        # on error
        $scope.working = false
        deferred.reject()

      $scope.username = ''
      $scope.password = ''
]
