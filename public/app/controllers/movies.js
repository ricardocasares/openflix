angular.module('openflix')
  .controller('MoviesController', function($scope, popular){
    $scope.movies = popular.data.results;
  });