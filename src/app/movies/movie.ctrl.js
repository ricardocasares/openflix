(function() {
  'use strict';

  angular
    .module('of.movies')
    .controller('MovieCtrl', MovieCtrl);

  MovieCtrl.$inject = ['item', 'MovieSvc'];

  function MovieCtrl(item, MovieSvc) {

    var vm = this;
    vm.movie = item;
    vm.torrents = 'lookup';
    vm.subtitles = 'lookup';
    vm.movie.torrents = [];
    vm.movie.subtitles = [];

    activate();

    function activate() {
      MovieSvc
        .getMovieTorrents(vm.movie.id)
        .then(torrentResolved, torrentRejected);
    }

    function torrentResolved(response) {
      vm.torrents = true;
      vm.movie.torrents = response;
      subtitleLookup(vm.movie.id);
    }

    function torrentRejected(response) {
      vm.torrents = false;
      vm.subtitles = false;
      vm.movie.torrents = response;
    }

    function subtitleLookup(id) {

    }

    function subtitleResolved(response) {
      vm.subtitles = true;
      vm.movie.subtitles = response;
    }

    function subtitleRejected(response) {
      vm.subtitles = false;
      vm.movie.subtitles = response;
    }

  }

})();
