angular
	.module('openflix')
  .controller('NavController', function($scope, tmDB){
    $scope.title = 'OpenFlix';
    tmDB.genres().then(function(genres) {
    	$scope.genres = genres.data.genres;
    });
  });