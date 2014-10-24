angular
  .module('openflix')
  .controller('MovieController', function($scope, movie, $sce){
    // selected movie
    $scope.movie = movie;
    // torrent selection
    $scope.selectTorrent = function(id) {
      $scope.selectedTorrent = $scope.movie.torrents[id];
    };
    // set default torrent
    $scope.selectTorrent(0);
    // play flag
    $scope.play = false;
    // play toggle
    $scope.playToggle = function() {
      if($scope.play) {
        $scope.play = false;
      } else {
        $scope.play = true;
      }
    };
    // video config
    $scope.config = {
      sources: [
        {src: $sce.trustAsResourceUrl('http://www.videogular.com/assets/videos/videogular.mp4'), type: 'video/mp4'},
        {src: $sce.trustAsResourceUrl('http://www.videogular.com/assets/videos/videogular.webm'), type: 'video/webm'},
        {src: $sce.trustAsResourceUrl('http://www.videogular.com/assets/videos/videogular.ogg'), type: 'video/ogg'}
      ],
      theme: {
        url: '/bower/videogular-themes-default/videogular.min.css'
      },
      plugins: {
        poster: {
          url: 'http://image.tmdb.org/t/p/w92/' + $scope.movie.poster_path
        }
      }
    };
  });