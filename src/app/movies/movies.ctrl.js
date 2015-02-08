(function () {
  'use strict';

  angular
    .module('of.movies')
    .controller('MoviesCtrl', MoviesCtrl);

  /**
   * Movies controller
   */
  MoviesCtrl.$inject = ['collection'];
  function MoviesCtrl(collection) {
    var vm = this;
    vm.movies = collection;
  }
})();
