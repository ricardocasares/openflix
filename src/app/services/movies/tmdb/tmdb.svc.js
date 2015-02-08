(function() {
  'use strict';
  angular
    .module('of.services.movies.tmdb', ['of.common.utils'])
    .constant('TMDBAPI', {
      svc: 'http://api.themoviedb.org/3',
      endpoints: {
        movie: '/movie/:id',
        latest: '/movie/latest',
        popular: '/movie/popular',
        genres: '/genre/movie/list',
        moviesByGenre: '/genre/:id/movies'
      }
    })
    .service('TmdbMovieSvc', TmdbMovieSvc);

  /**
   * TMDB API service
   */
  TmdbMovieSvc.$inject = ['normalize', '$http', '$q', 'TMDBAPI', 'TMDB_APIKEY'];
  function TmdbMovieSvc(normalize, $http, $q, TMDBAPI, TMDB_APIKEY) {

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
      $http.get(TMDBAPI.svc + TMDBAPI.endpoints.genres, {
        params: {
          api_key: TMDB_APIKEY
        }
      })
        .success(function(data) {
          deferred.resolve(data.genres);
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
      $http.get(TMDBAPI.svc + TMDBAPI.endpoints.popular, {
        params: {
          api_key: TMDB_APIKEY
        }
      })
        .success(function(data) {
          deferred.resolve(normalizeMovie(data.results));
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
      $http.get(TMDBAPI.svc + TMDBAPI.endpoints.movie.replace(':id', id), {
        params: {
          api_key: TMDB_APIKEY
        }
      })
        .success(function(data) {
          deferred.resolve(normalizeMovie(data));
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
      var deferred = $q.defer();
      $http.get(TMDBAPI.svc + TMDBAPI.endpoints.moviesByGenre.replace(':id', id), {
        params: {
          api_key: TMDB_APIKEY
        }
      })
        .success(function(data) {
          deferred.resolve(normalizeMovie(data[id]));
        });
      return deferred.promise;
    }

    function normalizeMovie(target) {
      // map for movie data
      var map = {
        id: 'id',
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
