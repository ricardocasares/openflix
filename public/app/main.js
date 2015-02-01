'use strict';
angular
  .module('openflix', [
    'ngRoute',
    'ngAnimate',
    'ngStorage',
    'angular-loading-bar',
    'slugifier'
  ])
  .constant('TMDBAPI','a21723b09e32b44cfbea649fe81ea9c7')
  .config(function($routeProvider, $locationProvider){
    $routeProvider
      .when('/movies', {
        controller: 'MoviesController',
        templateUrl: '/views/movies',
        resolve: {
          collection: function(tmDB) {
            return tmDB.popular();
          }
        }
      })
      .when('/favorites', {
        controller: 'MoviesController',
        templateUrl: '/views/movies',
        resolve: {
          collection: function(favService) {
            return favService.get();
          }
        }
      })
      .when('/search/:query', {
        controller: 'MoviesController',
        templateUrl: '/views/movies',
        resolve: {
          collection: function(tmDB, $route) {
            return tmDB.search($route.current.params.query);
          }
        }
      })
      .when('/movies/:slug/:tmdb', {
        controller: 'MovieController',
        templateUrl: '/views/movie',
        resolve: {
          movie: function(tmDB, yts, favService, $route) {
            return tmDB
              .movie($route.current.params.tmdb)
              .then(function(movie){
                movie.data.inFavs = favService.check(movie.data.imdb_id);
                return yts.find(movie.data.imdb_id)
                  .then(function(torrents){
                  movie.data.torrents = false;
                  if(!torrents.data.error) {
                    movie.data.torrents = torrents.data.MovieList;
                  }
                  return movie.data;
                });
              });
          }
        }
      })
      .when('/genres/:slug/:id', {
        controller: 'MoviesController',
        templateUrl: '/views/movies',
        resolve: {
          collection: function(tmDB, $route) {
            return tmDB.genre($route.current.params.id);
          }
        }
      })
      .otherwise({ redirectTo: '/movies'});
    $locationProvider.html5Mode(true);
  })
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }]);
