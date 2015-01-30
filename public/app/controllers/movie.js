'use strict';
angular
  .module('openflix')
  .controller('MovieController', function($scope, movie, $sce){
    // selected movie
    $scope.movie = movie;
    console.log(movie);
    // torrent selection
    $scope.selectTorrent = function(id) {
      $scope.selectedTorrent = $scope.movie.torrents[id];
    };
    $scope.selectSubtitle = function(id) {
      $scope.selectedSubtitle = $scope.movie.spoken_languages[id];
      $scope.subtitles = true;
    };
    // set default torrent
    $scope.selectTorrent(0);
    $scope.selectSubtitle(0);
  });