(function() {
  'use strict';
  angular
  	.module('of.navigation')
    .controller('NavCtrl', NavCtrl);

  NavCtrl.$inject = ['MockMovieSvc', '$location'];
  function NavCtrl(MockMovieSvc, $location){

    var vm = this;
    vm.title = 'openflix';
    vm.genres = MockMovieSvc.getGenres();
    vm.searchMovie = searchMovie;

    //////////////

    function searchMovie(query) {
    	$location.path('/search/' + query);
    }
  }

})();
