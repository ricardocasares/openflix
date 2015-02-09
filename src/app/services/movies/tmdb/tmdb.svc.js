(function() {
  'use strict';
  angular
    .module('of.services.movies.tmdb', [
      'of.common.utils',
      'of.services.torrents',
    ])
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
  TmdbMovieSvc.$inject = ['normalize', '$http', '$q', 'TorrentSvc', 'TMDBAPI', 'TMDB_APIKEY'];
  function TmdbMovieSvc(normalize, $http, $q, TorrentSvc, TMDBAPI, TMDB_APIKEY) {

    /**
     * service object
     * @type {Object}
     */
    var service = {
      getGenres: getGenres,
      getPopular: getPopular,
      getById: getById,
      getByGenre: getByGenre,
      getMovieTorrents: getMovieTorrents
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
        cache: true,
        params: {
          api_key: TMDB_APIKEY
        }
      })
        .success(function(data) {
          deferred.resolve(data.genres);
        });
      return deferred.promise;
    }

    function getMovieTorrents(id) {
      return TorrentSvc.getTorrentsByMovieId(id);
    }

    /**
     * returns the nth most popular
     * torrents
     * @return {Array} Object array
     */
    function getPopular() {
      var deferred = $q.defer();
      $http.get(TMDBAPI.svc + TMDBAPI.endpoints.popular, {
        cache: true,
        params: {
          api_key: TMDB_APIKEY
        }
      })
        .success(function(data) {
          deferred.resolve(normalizeData(data.results));
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
        cache: true,
        params: {
          api_key: TMDB_APIKEY
        }
      })
        .success(function(data) {
          deferred.resolve(normalizeData(data));
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
        cache: true,
        params: {
          api_key: TMDB_APIKEY
        }
      })
        .success(function(data) {
          deferred.resolve(normalizeData(data.results));
        });
      return deferred.promise;
    }

    function normalizeData(target) {
      // map for movie data
      var map = {
        id: 'imdb_id',
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
      var normalized = [];

      if(target instanceof Array) {
        map.id = 'id';
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
