(function () {
  'use strict';

  angular
    .module('of.movies')
    .controller('MoviesCtrl', MoviesCtrl);

  /**
   * Movies controller
   */
  MoviesCtrl.$inject = ['title', 'collection'];
  function MoviesCtrl(title, collection) {
    var vm = this;
    vm.title = title;
    vm.movies = collection;
    vm.movies.active = 0;
  }
})();
