(function() {
  'use strict';

  angular
    .module('of.movies')
    .controller('MovieCtrl', MovieCtrl);

  MovieCtrl.$inject = ['item'];

  function MovieCtrl(item) {

    var vm = this;
    vm.movie = item;

  }

})();
