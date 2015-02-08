(function() {
  'use strict';

  angular
    .module('of.common.utils', [])
    .factory('normalize', normalize);

    function normalize() {
      return function(map, obj) {
        var normalized = {};
        angular.forEach(map, function(v, k) {
          normalized[k] = obj[v];
        });
        return normalized;
      };
    }
})();
