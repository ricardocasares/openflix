(function() {
  'use strict';
  angular
    .module('of.services.movies', [
      'of.services.movies.mock',
      'of.services.movies.tmdb',
      'ngStorage',
    ])
    .service('MovieSvc', MovieSvc);

  /**
   * Fake movie API service
   * @type {Object}
   */
  MovieSvc.$inject = ['MockMovieSvc', 'TmdbMovieSvc', '$localStorage'];

  function MovieSvc(MockMovieSvc, TmdbMovieSvc, $localStorage) {
    var instance = $localStorage.goLocal ? MockMovieSvc : TmdbMovieSvc;

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
      return instance.getGenres();
    }

    /**
     * returns an array of torrents for
     * a given movie id
     * @param  {Number} id Movie imdb id
     * @return {Array}     Torrents array
     */
    function getMovieTorrents(id) {
      return instance.getMovieTorrents(id);
    }

    /**
     * returns the nth most popular
     * torrents
     * @return {Array} Object array
     */
    function getPopular() {
      return instance.getPopular();
    }

    /**
     * returns a movie by id
     * @param  {String} id Movie identificator
     * @return {Object}    Movie object
     */
    function getById(id) {
      return instance.getById(id);
    }

    /**
     * returns a collection of movies
     * by a given genre
     * @param  {Number} id Genre
     * @return {Array}  Movie array
     */
    function getByGenre(id) {
      return instance.getByGenre(id);
    }

    /**
     * returns an array of torrents for
     * a given movie id
     * @param  {String} id movie imdb id
     * @return {Array}     Torrents array
     */
    function getTorrents(id) {
      return instance.getTorrents(id);
    }

    /**
     * returns an array of subtitles for
     * a given movie id
     * @param  {String} id movie imdb id
     * @return {Array}     Subtitle array
     */
    function getSubtitles(id) {
      return instance.getSubtitles(id);
    }

  }
})();
