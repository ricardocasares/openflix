(function () {
  'use strict';
  angular
    .module('openflix')
    .controller('MoviesController', MoviesCtrl);

  MoviesCtrl.$inject = ['title', '$routeParams', 'collection'];

  function MoviesCtrl(title, $routeParams, collection) {
    var vm = this;
    vm.title = title;
    vm.movies = collection;
    vm.movies.active = 0;
  }
})();
