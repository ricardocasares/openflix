(function() {
  'use strict';
  angular
    .module('of.movies', [])
    .config(routing);

  function routing($routeProvider) {

    $routeProvider.when('/', {
      controller: 'MoviesCtrl',
      controllerAs: 'MoviesVM',
      templateUrl: '../app/features/movies/movies.html',
      resolve: {
        collection: ResolveMovies,
        title: function() {
          return 'Movies';
        }
      }
    });

    ResolveMovies.$inject = [];
    function ResolveMovies() {
      return [];
    }
  }

})();
