angular.module('noSession.session', []).service('noSession', [
  '$rootScope', '$http', '$q', function($rootScope, $http, $q) {
    var api, authenticated, loadSession, onError, scope, session, update;
    session = null;
    authenticated = false;
    scope = $rootScope;
    onError = function() {
      session = null;
      return authenticated = false;
    };
    api = {
      login: '/api/login',
      logout: '/api/logout',
      signup: '/api/signup',
      session: '/api/session'
    };
    loadSession = function(override) {
      var deferred, promise;
      deferred = $q.defer();
      promise = deferred.promise;
      if (!session || override) {
        $http.get(api.session).success(function(data, status, headers, config) {
          return update('loaded', function() {
            session = data;
            return deferred.resolve(data);
          });
        }).error(function(data, status, headers, config) {
          return update('error', function() {
            onError && onError();
            return deferred.reject({});
          });
        });
      } else {
        deferred.resolve(session);
      }
      return promise;
    };
    update = function(emit, fn) {
      if (scope.$$phase || scope.$root.$$phase) {
        fn();
      } else {
        scope.$apply(fn);
      }
      scope.$emit('session:' + emit, session);
      if (emit !== 'loaded') {
        return scope.$emit('session:loaded', session);
      }
    };
    return {
      config: function(options) {
        var err;
        if (options.login) {
          api.login = options.login;
        }
        if (options.logout) {
          api.logout = options.logout;
        }
        if (options.signup) {
          api.signup = options.signup;
        }
        if (options.session) {
          api.session = options.session;
        }
        if (options.scope) {
          scope = options.scope;
        }
        if (options.onError) {
          if (typeof options.onError !== 'function') {
            return err = new Error('noSession.config() requires ' + 'options.onError to be typeof == function');
          } else {
            return onError = options.onError;
          }
        }
      },
      load: function() {
        return loadSession(false);
      },
      refresh: function() {
        return loadSession(true);
      },
      isAuthenticated: function() {
        return authenticated;
      },
      login: function(params) {
        var deferred;
        deferred = $q.defer();
        $http.post(api.login, params).success(function(data, status, headers, config) {
          return update('login', function() {
            session = data;
            authenticated = true;
            return deferred.resolve(true);
          });
        }).error(function(data, status, headers, config) {
          return update('error', function() {
            onError && onError();
            return deferred.reject(false);
          });
        });
        return deferred.promise;
      },
      signup: function(params) {
        var deferred;
        deferred = $q.defer();
        $http.post(api.signup, params).success(function(data, status, headers, config) {
          return update('signup', function() {
            session = data;
            authenticated = true;
            return deferred.resolve(true);
          });
        }).error(function(data, status, headers, config) {
          return update('error', function() {
            onError && onError();
            return deferred.reject(false);
          });
        });
        return deferred.promise;
      },
      logout: function() {
        var deferred;
        deferred = $q.defer();
        $http.get(api.logout).success(function(data, status, headers, config) {
          return update('logout', function() {
            session = null;
            authenticated = false;
            return deferred.resolve(true);
          });
        }).error(function(data, status, headers, config) {
          return update('error', function() {
            onError && onError();
            return deferred.reject(false);
          });
        });
        return deferred.promise;
      }
    };
  }
]);

angular.module('noSession.auth', ['noSession.session']).provider('noAuth', function() {
  var $location, $q, $state, noSession;
  noSession = null;
  $location = null;
  $state = null;
  $q = null;
  this.auth = function(options) {
    return function() {
      var authKey, deferred, handleError, redirAuth, reqAuth;
      handleError = function(err) {
        err = new Error(err);
        console.log(err);
        throw err;
        return false;
      };
      if (!noSession || !$location || !$state || !$q) {
        return handleError('ERROR! noAuth not initialized.');
      }
      if (!('authKey' in options)) {
        return handleError('noAuth requires options.authKey ' + 'in the options object');
      } else if (!('reqAuth' in options)) {
        return handleError('noAuth requires options.reqAuth ' + 'in the options object');
      } else if (!('redirAuth' in options)) {
        return handleError('noAuth requires options.redirAuth ' + 'in the options object');
      }
      authKey = options.authKey;
      reqAuth = options.reqAuth;
      redirAuth = options.redirAuth;
      deferred = $q.defer();
      noSession.load().then(function(session) {
        var checkAuth;
        checkAuth = function() {
          var i, k, keys, ref;
          keys = authKey.split('.');
          ref = session;
          i = 0;
          while (i < keys.length) {
            k = keys[i];
            if (!ref[k]) {
              return false;
            }
            ref = ref[k];
            ++i;
          }
          return true;
        };
        if (reqAuth) {
          if ((session == null) || typeof session !== 'object' || !checkAuth()) {
            deferred.resolve(null);
            if ($state.current.name !== reqAuth) {
              return $state.go(reqAuth);
            } else {
              $location.path($state.current.url);
              return $state.go(reqAuth);
            }
          } else {
            return deferred.resolve(true);
          }
        } else if (redirAuth) {
          if (session && Object.getOwnPropertyNames(session).length) {
            deferred.reject(null);
            if ($state.current.name !== redirAuth) {
              return $state.go(redirAuth);
            } else {
              return $location.path($state.current.url);
            }
          } else {
            return deferred.resolve(true);
          }
        } else {
          return deferred.resolve(true);
        }
      });
      return deferred.promise;
    };
  };
  this.$get = function() {
    return {
      bootstrap: function(_location, _state, _q, _noSession) {
        $location = _location;
        $state = _state;
        $q = _q;
        return noSession = _noSession;
      }
    };
  };
  return this;
});

angular.module('noSession', ['ui.router', 'noSession.auth']).run([
  '$rootScope', '$state', '$location', '$http', '$q', 'noAuth', 'noSession', function($rootScope, $state, $location, $http, $q, noAuth, noSession) {
    return noAuth.bootstrap($location, $state, $q, noSession);
  }
]);
