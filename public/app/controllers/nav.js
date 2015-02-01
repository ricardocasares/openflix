angular
	.module('openflix')
  .controller('NavController', function($scope, tmDB, $location, $routeParams){

    $scope.title = 'openflix';

    tmDB.genres().then(function(genres) {
    	$scope.genres = genres.data.genres;
    });

    $scope.search = function(query) {
    	$location.path('/search/' + query);
    };
  });
