(function() {
  'use strict';

  angular
    .module('of.movies')
    .controller('MovieCtrl', MovieCtrl);

  MovieCtrl.$inject = ['item', 'MovieSvc', 'BitTorrentSvc', '$sce', '$timeout'];

  function MovieCtrl(item, MovieSvc, BitTorrentSvc, $sce, $timeout) {

    var vm = this;

    vm.videoURL;
    vm.movie = item;
    vm.torrents = 'lookup';
    vm.subtitles = 'lookup';
    vm.movie.torrents = [];
    vm.movie.subtitles = [];
    vm.torrentModel = {};
    vm.startDownload = startDownload;

    activate();

    function activate() {
      MovieSvc
        .getMovieTorrents(vm.movie.id)
        .then(torrentResolved, torrentRejected);
    }

    function torrentResolved(response) {
      vm.torrents = true;
      vm.movie.torrents = response;
      vm.torrentModel = response[0];
      console.log(vm.torrentModel);
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

    function startDownload() {
      BitTorrentSvc
        .startDownload(vm.torrentModel.url)
        .then(function(torrent) {
          $timeout(function() {
            vm.videoURL = makeURL(torrent);
          }, 20000);
        });
    }

    function makeURL(data) {
      var url = 'http://localhost:8000'
        .concat('/', encodeURIComponent(data.name))
        .concat('/', encodeURIComponent(data.file));

      return $sce.trustAsResourceUrl(url);
    }

  }

})();
