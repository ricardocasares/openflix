(function() {
  'use strict';
  angular
    .module('of.movie', [])
    .config(routing);

  function routing($routeProvider) {

    $routeProvider.when('/movie', {
      controller: 'MovieCtrl',
      controllerAs: 'MovieVM',
      templateUrl: '../app/features/movie/movie.html',
      resolve: {
        movie: ResolveMovie
      }
    });

    ResolveMovie.$inject = [];
    function ResolveMovie() {

    }
  }
})();
