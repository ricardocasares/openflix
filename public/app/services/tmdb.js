angular
  .module('openflix')
  .service('tmDB', function($http, TMDBAPI){
    
    var tmDB = {};
    var apiKey = TMDBAPI;

    tmDB.base = 'http://api.themoviedb.org/3';

    tmDB.popular = function() {
      return $http.get(tmDB.base + '/movie/popular', {
          params: {
            api_key: apiKey
          }
        })
        .success(function(popular){
          return popular;
        });
    };

    tmDB.movie = function(id) {
      return $http.get(tmDB.base + '/movie/' + id, {
          params: {
            append_to_response: 'images',
            api_key: apiKey
          }
        })
        .success(function(movie){
          return movie;
        });
    };

    return tmDB;
  });