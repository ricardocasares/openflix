'use strict';
angular
  .module('openflix')
  .controller('MovieController', function($scope, movie, favService){
    // selected movie
    $scope.movie = movie;
    // torrent selection
    $scope.selectTorrent = function(id) {
      $scope.selectedTorrent = $scope.movie.torrents[id];
    };
    $scope.selectSubtitle = function(id) {
      $scope.selectedSubtitle = $scope.movie.spoken_languages[id];
      $scope.subtitles = true;
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
    $scope.selectSubtitle(0);
  });
