(function() {
  'use strict';

  angular
    .module('of.movie')
    .controller('MovieCtrl', MovieCtrl);

  MovieCtrl.$inject = ['movie', 'favSvc'];

  function MovieCtrl(movie, favSvc) {

    var vm = this;
    vm.movie = movie;
    vm.subtitleTracks = [];
    vm.selectTorrent = selectTorrent;
    vm.downloadSubtitle = downloadSubtitle;
    vm.addToFavs = addToFavs;

    //////////////

    // set default torrent and subtitles
    selectTorrent(0);
    selectSubtitle('english', 0);

    //////////////

    // torrent selection
    function selectTorrent(id) {
      vm.selectedTorrent = vm.movie.torrents[id];
    }

    function selectSubtitle (lang, idx) {
      vm.selectedSubtitle = lang
        .substring(0,2)
        .toUpperCase()
        .concat(' ')
        .concat(idx + 1);
      vm.downloadSubtitle(lang, idx);
      vm.subtitles = true;
    }

    function downloadSubtitle (lang, idx) {
      var sub = vm.movie.subtitles[lang][idx].url.split('/')[2];
      vm.subtitleTracks = [];
      vm.subtitleTracks.push({
        url: '/api/subs/'.concat(sub),
        srclang: lang.substring(0, 2),
        label: lang
      });
    }

    function addToFavs() {
      favSvc.add(movie);
      vm.movie.inFavs = true;
    }

    function removeFromFavs () {
      favSvc.remove(movie);
      vm.movie.inFavs = false;
    }
  }

})();
