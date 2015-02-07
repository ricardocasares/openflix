(function (){
  'use strict';
  angular
  .module('openflix', [
    'ngRoute',
    'ngStorage',
    'angular-loading-bar',
    'slugifier',
    'ui.bootstrap',
    'of.navigation',
    'of.movies',
    'of.movie'
  ])
  .constant('TMDBAPI','a21723b09e32b44cfbea649fe81ea9c7')
  .constant('SSAPI','954f62bffd117187da50a243f981c7d9a50c1153')
  .config(routing)
  .config(loadingBar)
  .controller('AppCtrl', AppCtrl);

  function routing($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({ redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }

  function loadingBar(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }

  function AppCtrl() {
    var vm = this;
    vm.title = 'This';
  }
})();
