'use strict';
angular
  .module('openflix')
  .controller('MovieController', function($scope, movie, favService, $http){
    // selected movie
    $scope.movie = movie;
    $scope.subtitleTracks = [];
    // torrent selection
    $scope.selectTorrent = function(id) {
      $scope.selectedTorrent = $scope.movie.torrents[id];
    };
    $scope.selectSubtitle = function(lang, idx) {
      $scope.selectedSubtitle = lang
        .substring(0,2)
        .toUpperCase()
        .concat(' ')
        .concat(idx + 1);
      $scope.downloadSubtitle(lang, idx);
      $scope.subtitles = true;
    };

    $scope.downloadSubtitle = function(lang, idx) {
      var sub = $scope.movie.subtitles[lang][idx].url.split('/');
      $scope.subtitleTracks = [];
      $scope.subtitleTracks.push({
        url: '/api/subs/'+sub[2],
        srclang: lang.substring(0,2),
        label: lang
      });
    };

    $scope.addToFavs = function() {
      favService.add(movie);
      $scope.movie.inFavs = true;
    };

    $scope.removeFromFavs = function() {
      favService.remove(movie);
      $scope.movie.inFavs = false;
    };

    // set default torrent
    $scope.selectTorrent(0);
    $scope.selectSubtitle('english', 0);
  });
