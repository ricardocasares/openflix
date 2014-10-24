angular
  .module('openflix', [
    'ngRoute',
    'ngAnimate',
    'angular-loading-bar',
    'slugifier',
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.poster'
  ])
  .constant('TMDBAPI','a21723b09e32b44cfbea649fe81ea9c7')
  .config(function($routeProvider, $locationProvider){
    $routeProvider
      .when('/movies', {
        controller: 'MoviesController',
        templateUrl: '/views/movies',
        resolve: {
          popular: function(tmDB) {
            return tmDB.popular();
          }
        }
      })
      .when('/movies/:slug/:tmdb', {
        controller: 'MovieController',
        templateUrl: '/views/movie',
        resolve: {
          movie: function(tmDB, yts, $route) {
            return tmDB
              .movie($route.current.params.tmdb)
              .then(function(movie){
                return yts.find(movie.data.imdb_id).then(function(torrents){
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
      .otherwise({ redirectTo: '/movies'});
    $locationProvider.html5Mode(true);
  });