(function() {
  'use strict';
  angular
    .module('of.movie', [])
    .config(routing);

  function routing($routeProvider) {

    $routeProvider.when('/movie/:slug/:id', {
      controller: 'MovieCtrl',
      controllerAs: 'MovieVM',
      templateUrl: 'movie.html',
      resolve: {
        movie: ResolveMovie
      }
    });

    ResolveMovie.$inject = [];
    function ResolveMovie() {

    }
  }
})();
