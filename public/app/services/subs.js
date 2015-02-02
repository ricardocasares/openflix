angular
  .module('openflix')
  .service('subService', function($http, SSAPI) {
    var ss = {};
    var apiKey = SSAPI;
    // base endpoint
    ss.base = 'http://jsonp.nodejitsu.com/?url=http://api.ysubs.com/subs/';

    ss.get = function(imdb) {
      var url = ss.base + imdb;
      return $http.get(url)
        .success(function(subs){
          return subs;
        });
    };

    return ss;

  });
