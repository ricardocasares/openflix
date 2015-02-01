angular
  .module('openflix')
  .directive('movieCollection', function() {
    return {
      restrict: 'E',
      templateUrl: '/views/movie-collection',
      scope: {
        collection: '='
      }
    };
  });
