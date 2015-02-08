(function() {
  'use strict';
  angular
    .module('of.services.movies.mock', ['of.common.utils'])
    .service('MockMovieSvc', MockMovieSvc);

  /**
   * Fake movie API service
   * @type {Object}
   */
  MockMovieSvc.$inject = ['normalize', '$http', '$q'];

  function MockMovieSvc(normalize, $http, $q) {

    /**
     * service object
     * @type {Object}
     */
    var service = {
      getGenres: getGenres,
      getPopular: getPopular,
      getById: getById,
      getByGenre: getByGenre
    };

    return service;

    //////////////

    /**
     * returns an array of movie genres
     * @return {Array} Genres array
     */
    function getGenres() {
      var deferred = $q.defer();
      $http.get('/stubs/genres.json')
        .success(function(data) {
          deferred.resolve(data);
        });
      return deferred.promise;
    }

    /**
     * returns the nth most popular
     * torrents
     * @return {Array} Object array
     */
    function getPopular() {
      var deferred = $q.defer();
      $http.get('/stubs/movies.json')
        .success(function(data) {
          deferred.resolve(normalizeIt(data));
        });
      return deferred.promise;
    }

    /**
     * returns a movie by id
     * @param  {String} id Movie identificator
     * @return {Object}    Movie object
     */
    function getById(id) {
      var deferred = $q.defer();
      $http.get('/stubs/movies.json')
        .success(function(data) {
          deferred.resolve(normalizeIt(data[id]));
        });
      return deferred.promise;
    }

    /**
     * returns a collection of movies
     * by a given genre
     * @param  {int} id Genre
     * @return {Array}  Movie array
     */
    function getByGenre(id) {

    }

    function normalizeIt(target) {
      // map for movie data
      var map = {
        title: 'title',
        tagline: 'tagline',
        poster: 'backdrop_path',
        thumb: 'poster_path',
        voteCount: 'vote_count',
        voteAverage: 'vote_average',
        releaseDate: 'release_date',
        runTime: 'runtime',
        genres: 'genres',
        overview: 'overview',
      };

      if(target instanceof Array) {
        var normalized = [];
        angular.forEach(target, function(obj) {
          normalized.push(normalize(map, obj));
        });
        return normalized;
      } else if(target instanceof Object) {
        return normalize(map, target);
      }
    }

  }

})();
