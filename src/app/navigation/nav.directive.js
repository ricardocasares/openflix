(function() {
  'use strict';
  angular
  	.module('of.navigation')
    .directive('ofNavigation', OfNavigation);

  function OfNavigation() {
    return {
      restrict: 'E',
      templateUrl: '/app/navigation/nav.tpl.html',
      controller: NavCtrl,
      controllerAs: 'navVm',
      replace: true
    };
  }

  NavCtrl.$inject = ['MockMovieSvc','$location'];
  function NavCtrl(MockMovieSvc, $location){

    var vm = this;
    vm.genres = [];
    vm.searchMovie = searchMovie;

    //////////////

    MockMovieSvc.getGenres().then(function(data){
      vm.genres = data;
    });

    function searchMovie(query) {
    	$location.path('/search/' + query);
    }
  }

})();
