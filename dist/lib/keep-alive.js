var Logger, appCONFIG, config, http, log;

http = require('http');

appCONFIG = require('../config/env/app');

Logger = require('../lib/logger');

log = new Logger;

config = {
  links: [
    {
      /*
        host: 'localhost'
        port: process.env.PORT || appCONFIG.port || 3000
        path: '/'
      ,
      */

      host: 'chatboxx-beta.herokuapp.com',
      port: 80,
      path: '/'
    }
  ],
  interval: 60 * 1000
};

module.exports = {
  run: function() {
    return setInterval(function() {
      var url, _i, _len, _ref, _results;
      _ref = config.links;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        url = _ref[_i];
        _results.push((function(url) {
          return http.get(url, function(res) {
            return res.on('data', function(chunk) {
              var e;
              try {
                return log.debug('Keep-alive response: ' + chunk);
              } catch (_error) {
                e = _error;
                return log.debug('Keep-alive error: ' + e.message);
              }
            });
          }).on('error', function(err) {
            return log.debug('Keep-alive error: ' + err.message);
          });
        })(url));
      }
      return _results;
    }, config.interval);
  }
};
