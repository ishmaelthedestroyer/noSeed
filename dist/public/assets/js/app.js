/** 
 * noSeed - v0.0.0 - 2014-03-07
 * http://no-seed.herokuapp.com 
 * 
 * Copyright (c) 2014 ishmaelthedestroyer
 * Licensed  <>
 * */
var app;

app = angular.module('App', ['ui.router', 'ui.bootstrap', 'noToolbox']);

app.run([
  '$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    return $rootScope.$stateParams = $stateParams;
  }
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/404');
  return $locationProvider.html5Mode(true);
});

angular.element(document).ready(function() {
  return angular.bootstrap(document, ['App']);
});

app.controller('AppCtrl', ['$scope', function($scope) {}]);

app.config(function($stateProvider) {
  return $stateProvider.state('404', {
    url: '/404',
    templateUrl: '/routes/404/views/404.html'
  });
});

app.config(function($stateProvider) {
  return $stateProvider.state('index', {
    url: '/',
    templateUrl: '/routes/index/views/index.html'
  });
});

app.config([
  '$stateProvider', 'noAuthProvider', function($stateProvider, Auth) {
    return $stateProvider.state('login', {
      url: '/login',
      templateUrl: '/routes/login/views/login.html',
      resolve: {
        Auth: Auth.auth({
          authKey: 'user',
          reqAuth: false,
          redirAuth: 'index'
        })
      }
    });
  }
]);

/*
uiAuth: ngAuthProvider.auth
  reqAuth: false
  redirAuth: 'index'
*/


app.config([
  '$stateProvider', 'noAuthProvider', function($stateProvider, Auth) {
    return $stateProvider.state('signup', {
      url: '/signup',
      templateUrl: '/routes/signup/views/signup.html',
      resolve: {
        Auth: Auth.auth({
          authKey: 'user',
          reqAuth: false,
          redirAuth: 'index'
        })
      }
    });
  }
]);

app.controller('IndexCtrl', [
  '$scope', '$state', function($scope, $state) {
    var apply;
    return apply = function(scope, fn) {
      if (scope.$$phase || scope.$root.$$phase) {
        return fn();
      } else {
        return scope.$apply(fn);
      }
    };
  }
]);

app.controller('LoginCtrl', [
  '$scope', '$location', '$q', 'noSession', 'noQueue', 'noNotify', 'noLogger', function($scope, $location, $q, Session, Queue, Notify, Logger) {
    var EMAIL_REGEXP, NUM_REGEXP;
    $scope.working = false;
    $scope.username = '';
    $scope.password = '';
    EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    NUM_REGEXP = /\d/;
    $scope.promptEmail = '';
    $scope.statusEmail = 'warning';
    $scope.validEmail = false;
    $scope.validateEmail = function() {
      if (!$scope.username.length) {
        $scope.promptEmail = '';
        $scope.statusEmail = 'warning';
        $scope.validEmail = false;
        return 'empty';
      } else if (EMAIL_REGEXP.test($scope.username)) {
        $scope.promptEmail = '';
        $scope.statusEmail = 'success';
        $scope.validEmail = true;
        return 'valid';
      } else {
        $scope.promptEmail = 'Invalid email.';
        $scope.statusEmail = 'error';
        $scope.validEmail = false;
        return 'Invalid email.';
      }
    };
    $scope.promptPassword = '';
    $scope.statusPassword = 'warning';
    $scope.validPassword = false;
    $scope.validatePassword = function() {
      if (!$scope.password.length) {
        $scope.promptPassword = '';
        $scope.statusPassword = 'warning';
        $scope.validPassword = false;
        return 'empty';
      } else if ($scope.password.length < 7) {
        $scope.promptPassword = 'Your password must be at least 7 ' + 'characters long.';
        $scope.statusPassword = 'error';
        $scope.validPassword = false;
        return 'invalid';
      } else if (!NUM_REGEXP.test($scope.password)) {
        $scope.promptPassword = 'Your password must contain at least ' + 'one number.';
        $scope.statusPassword = 'error';
        $scope.validPassword = false;
        return 'invalid';
      } else {
        $scope.promptPassword = '';
        $scope.statusPassword = 'success';
        $scope.validPassword = true;
        return 'valid';
      }
    };
    return $scope.login = function() {
      var deferred;
      $scope.working = true;
      deferred = $q.defer();
      Queue.push(deferred.promise);
      Logger.debug('Attempting to sign in user.');
      Session.login({
        username: $scope.username,
        password: $scope.password
      }).then(function(result) {
        $scope.working = false;
        deferred.resolve();
        Notify.push('Login successful.', 'success', 3000);
        return $location.path('/');
      }, function() {
        $scope.working = false;
        return deferred.reject();
      });
      $scope.username = '';
      return $scope.password = '';
    };
  }
]);

app.controller('SignupCtrl', [
  '$scope', '$http', '$location', '$q', 'noSession', 'noQueue', 'noNotify', 'noLogger', function($scope, $http, $location, $q, Session, Queue, Notify, Logger) {
    var EMAIL_REGEXP, NUM_REGEXP;
    $scope.working = false;
    $scope.name = '';
    $scope.email = '';
    $scope.password = '';
    $scope.passwordConfirm = '';
    $scope.promptName = '';
    $scope.statusName = 'warning';
    $scope.validName = false;
    $scope.validateName = function() {
      if (!$scope.name.length) {
        $scope.promptName = '';
        $scope.statusName = 'warning';
        $scope.validName = false;
        return 'empty';
      } else if ($scope.name.length < 3) {
        $scope.promptName = 'Name too short.';
        $scope.statusName = 'error';
        $scope.validName = false;
        return 'invalid';
      } else {
        $scope.promptName = '';
        $scope.statusName = 'success';
        $scope.validName = true;
        return 'valid';
      }
    };
    EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    NUM_REGEXP = /\d/;
    $scope.promptEmail = '';
    $scope.statusEmail = 'warning';
    $scope.validEmail = false;
    $scope.validateEmail = function() {
      if (!$scope.email.length) {
        $scope.promptEmail = '';
        $scope.statusEmail = 'warning';
        $scope.validEmail = false;
        return 'empty';
      } else if (EMAIL_REGEXP.test($scope.email)) {
        $scope.promptEmail = '';
        $scope.statusEmail = 'success';
        $scope.validEmail = true;
        return 'valid';
      } else {
        $scope.promptEmail = 'Invalid email.';
        $scope.statusEmail = 'error';
        $scope.validEmail = false;
        return 'Invalid email.';
      }
    };
    $scope.promptPassword = '';
    $scope.statusPassword = 'warning';
    $scope.validPassword = false;
    $scope.validatePassword = function() {
      if (!$scope.password.length) {
        $scope.promptPassword = '';
        $scope.statusPassword = 'warning';
        $scope.validPassword = false;
        return 'empty';
      } else if ($scope.password.length < 7) {
        $scope.promptPassword = 'Your password must be at least 7 ' + 'characters long.';
        $scope.statusPassword = 'error';
        $scope.validPassword = false;
        return 'invalid';
      } else if (!NUM_REGEXP.test($scope.password)) {
        $scope.promptPassword = 'Your password must contain at least ' + 'one number.';
        $scope.statusPassword = 'error';
        $scope.validPassword = false;
        return 'invalid';
      } else {
        $scope.promptPassword = '';
        $scope.statusPassword = 'success';
        $scope.validPassword = true;
        return 'valid';
      }
    };
    $scope.promptPasswordConfirm = '';
    $scope.statusPasswordConfirm = 'warning';
    $scope.validPasswordConfirm = false;
    $scope.validatePasswordConfirm = function() {
      if (!$scope.passwordConfirm.length) {
        $scope.promptPasswordConfirm = '';
        $scope.statusPasswordConfirm = 'warning';
        $scope.validPasswordConfirm = false;
        return 'empty';
      } else if ($scope.password !== $scope.passwordConfirm) {
        $scope.promptPasswordConfirm = 'Your passwords don\'t match.';
        $scope.statusPasswordConfirm = 'error';
        $scope.validPasswordConfirm = false;
        return 'invalid';
      } else {
        $scope.promptPasswordConfirm = '';
        $scope.statusPasswordConfirm = 'success';
        $scope.validPasswordConfirm = true;
        return 'valid';
      }
    };
    return $scope.signup = function() {
      var deferred;
      Logger.debug('Attempting to signup:', {
        name: $scope.name,
        email: $scope.email,
        password: $scope.password,
        confirm: $scope.passwordConfirm
      });
      $scope.working = true;
      deferred = $q.defer();
      Queue.push(deferred.promise);
      Logger.debug('Attempting to signup user.');
      Session.signup({
        name: $scope.name,
        email: $scope.email,
        password: $scope.password
      }).then(function(result) {
        $scope.working = false;
        deferred.resolve();
        Notify.push('Signup successful.', 'success', 3000);
        return $location.path('/');
      }, function() {
        $scope.working = false;
        return deferred.reject();
      });
      $scope.name = '';
      $scope.email = '';
      $scope.password = '';
      return $scope.passwordConfirm = '';
    };
  }
]);
