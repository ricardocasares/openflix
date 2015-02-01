angular
  .module('openflix')
  .controller('MoviesController', function($scope, collection, $routeParams) {
    $scope.title = $routeParams.slug || 'Movies, no bullsh*t';
    $scope.movies = collection.data.results;
  });
