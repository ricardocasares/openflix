(function() {
  'use strict';
  angular
    .module('of.services.torrents.yts', ['of.common.utils'])
    .constant('YTSAPI', {
      svc: 'https://yts.re/api/v2',
      endpoints: {
        movie: '/list_movies.json'
      }
    })
    .service('YtsTorrentSvc', YtsTorrentSvc);

  /**
   * TMDB API service
   */
  YtsTorrentSvc.$inject = ['normalize', '$http', '$q', 'YTSAPI'];
  function YtsTorrentSvc(normalize, $http, $q, YTSAPI) {

    /**
     * service object
     * @type {Object}
     */
    var service = {
      getTorrentsByMovieId: getTorrentsByMovieId
    };

    return service;

    //////////////

    /**
     * returns an array of movie genres
     * @return {Array} Genres array
     */
    function getTorrentsByMovieId(id) {
      var deferred = $q.defer();
      $http
        .get(YTSAPI.svc + YTSAPI.endpoints.movie, {
          params: {
            query_term: id
          }
        })
        .success(function(result) {
          if(!result.data.movie_count) {
            deferred.reject(false);
          } else {
            deferred.resolve(normalizeData(result.data.movies[0].torrents));
          }
        });
      return deferred.promise;
    }

    function normalizeData(target) {
      // map for movie data
      var map = {
        url: 'url',
        hash: 'hash',
        quality: 'quality',
        seeds: 'seeds',
        peers: 'peers',
        size: 'size'
      };
      var normalized = [];

      angular.forEach(target, function(obj) {
        normalized.push(normalize(map, obj));
      });

      return normalized;
    }

  }

})();
