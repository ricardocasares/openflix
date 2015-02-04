angular
  .module('openflix')
  .service('favService', function($localStorage) {
    var fav = {};
    $localStorage.favoritesCollection = $localStorage.favoritesCollection || [];

    fav.add = function(movie) {
      if(!fav.check(movie.imdb_id)) {
        $localStorage.favoritesCollection.push(movie);
      }
    };

    fav.get = function() {
      return $localStorage.favoritesCollection;
    };

    fav.remove = function(movie) {
      if(fav.check(movie.imdb_id)) {
        $localStorage.favoritesCollection = $localStorage.favoritesCollection.filter(function(obj) {
          return obj.imdb_id !== movie.imdb_id;
        });
      }
    };

    fav.check = function(imdbId) {
      var inFavs;
      if($localStorage.favoritesCollection.length === 0) {
        return false;
      }
      angular.forEach($localStorage.favoritesCollection, function(obj) {
        if(obj.imdb_id === imdbId) {
          inFavs = true;
        } else {
          inFavs = false;
        }
      });
      return inFavs;
    };

    return fav;

  });
