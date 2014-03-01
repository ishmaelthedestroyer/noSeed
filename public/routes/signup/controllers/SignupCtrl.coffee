app.controller 'SignupCtrl', [
  '$scope', '$http', '$location', '$q', 'noSession',
  'noQueue', 'noNotify', 'noLogger'
  ($scope, $http, $location, $q, Session, Queue, Notify, Logger) ->
    $scope.working = false
    $scope.name = ''
    $scope.email = ''
    $scope.password = ''
    $scope.passwordConfirm = ''

    $scope.promptName = ''
    $scope.statusName = 'warning'
    $scope.validName = false
    $scope.validateName = () ->
      if !$scope.name.length
        $scope.promptName = ''
        $scope.statusName = 'warning'
        $scope.validName = false
        return 'empty'
      else if $scope.name.length < 3
        $scope.promptName = 'Name too short.'
        $scope.statusName = 'error'
        $scope.validName = false
        return 'invalid'
      else
        $scope.promptName = ''
        $scope.statusName = 'success'
        $scope.validName = true
        return 'valid'

    EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
    NUM_REGEXP = /\d/

    $scope.promptEmail = ''
    $scope.statusEmail = 'warning'
    $scope.validEmail = false
    $scope.validateEmail = () ->
      if !$scope.email.length
        $scope.promptEmail = ''
        $scope.statusEmail = 'warning'
        $scope.validEmail = false
        return 'empty'
      else if EMAIL_REGEXP.test $scope.email
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

    $scope.promptPasswordConfirm = ''
    $scope.statusPasswordConfirm = 'warning'
    $scope.validPasswordConfirm = false
    $scope.validatePasswordConfirm = () ->
      if !$scope.passwordConfirm.length
        $scope.promptPasswordConfirm = ''
        $scope.statusPasswordConfirm = 'warning'
        $scope.validPasswordConfirm = false
        return 'empty'
      else if $scope.password != $scope.passwordConfirm
        $scope.promptPasswordConfirm = 'Your passwords don\'t match.'
        $scope.statusPasswordConfirm = 'error'
        $scope.validPasswordConfirm = false
        return 'invalid'
      else
        $scope.promptPasswordConfirm = ''
        $scope.statusPasswordConfirm = 'success'
        $scope.validPasswordConfirm = true
        return 'valid'

    $scope.signup = () ->
      Logger.debug 'Attempting to signup:',
        name: $scope.name
        email: $scope.email
        password: $scope.password
        confirm: $scope.passwordConfirm

      $scope.working = true
      deferred = $q.defer()
      Queue.push deferred.promise
      Logger.debug 'Attempting to signup user.'

      Session.signup(
        name: $scope.name
        email: $scope.email
        password: $scope.password
      ).then (result) ->
        $scope.working = false
        deferred.resolve()
        Notify.push 'Signup successful.', 'success', 3000
        $location.path '/'
      , () -> # on error
        $scope.working = false
        deferred.reject()

      $scope.name = ''
      $scope.email = ''
      $scope.password = ''
      $scope.passwordConfirm = ''
]
