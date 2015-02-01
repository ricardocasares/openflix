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

    tmDB.genres = function() {
      return $http.get(tmDB.base + '/genre/movie/list', {
          params: {
            api_key: apiKey
          }
        })
        .success(function(genres){
          return genres;
        });
    };

    tmDB.genre = function(id) {
      return $http.get(tmDB.base + '/genre/' + id + '/movies', {
          params: {
            api_key: apiKey
          }
        })
        .success(function(movies){
          return movies;
        });
    };

    tmDB.search = function(query) {
      return $http.get(tmDB.base + '/search/movie', {
          params: {
            api_key: apiKey,
            query: query
          }
        })
        .success(function(movies){
          return movies;
        });
    };

    return tmDB;
  });