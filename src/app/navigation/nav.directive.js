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

  NavCtrl.$inject = ['MovieSvc','$location'];
  function NavCtrl(MovieSvc, $location){

    var vm = this;
    vm.genres = [];
    vm.searchMovie = searchMovie;

    //////////////

    MovieSvc.getGenres().then(function(data){
      vm.genres = data;
    });

    function searchMovie(query) {
    	$location.path('/search/' + query);
    }
  }

})();
