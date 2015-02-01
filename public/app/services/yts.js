angular.module('openflix')
  .service('yts', function($http) {

    var yts = {};
    yts.base = 'https://yts.re/api';

    yts.list = function() {
      return $http.get(yts.base + '/list.json', {cache: true})
        .success(function(result){
          return result.MovieList;
        });
    };

    yts.find = function(id) {
      return $http.get(yts.base + '/listimdb.json', {
          params: {
            imdb_id: id
          },
          cache: true
        })
        .success(function(result){
          return result.MovieList;
        });
    };

    return yts;
  });
