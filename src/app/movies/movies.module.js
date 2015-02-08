(function() {
  'use strict';
  angular
    .module('of.movies', ['of.services.movies'])
    .config(routing);

  function routing($routeProvider) {

    $routeProvider
      .when('/', {
        controller: 'MoviesCtrl',
        controllerAs: 'mvsVm',
        templateUrl: '/app/movies/movies.tpl.html',
        resolve: {
          collection: ResolveCollection
        }
      })
      .when('/movies/:slug/:id', {
        controller: 'MovieCtrl',
        controllerAs: 'mvVm',
        templateUrl: '/app/movies/movie.tpl.html',
        resolve: {
          item: ResolveItem,
        }
      });

    ResolveCollection.$inject = ['MovieSvc'];
    function ResolveCollection(MovieSvc) {
      return MovieSvc.getPopular();
    }

    ResolveItem.$inject = ['MovieSvc', '$route'];
    function ResolveItem(MovieSvc, $route) {
      return MovieSvc.getById($route.current.params.id);
    }
  }

})();
