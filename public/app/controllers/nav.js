angular
	.module('openflix')
  .controller('NavController', function($scope, MockMovieSvc, $location, $routeParams){

    $scope.title = 'openflix';

    $scope.genres = MockMovieSvc.getGenres();

    $scope.search = function(query) {
    	$location.path('/search/' + query);
    };
  });
