angular
  .module('openflix')
  .controller('MoviesController', function($scope, collection, title, $routeParams) {
    $scope.title = title;
    $scope.movies = collection.data.results;
    $scope.movies.active = 0;
  });
