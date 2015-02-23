(function(){
    'use strict';
    /**
    * of.services.bittorrent.chrome Module
    *
    * Chrome app communication service
    */
    angular
      .module('of.services.bittorrent.chrome', [])
      .service('ChromeTorrentSvc', ChromeTorrentSvc);

    ChromeTorrentSvc.$inject = ['$q'];
    function ChromeTorrentSvc ($q) {

      var port;
      var torrent;
      var extensionId = 'mapiphhfbnlhkhncppajodljaoaipnhj';

      var service = {
        startDownload: startDownload
      };

      return service;

      ///////////////

      function startDownload(torrent) {

        var deferred = $q.defer();
        port = chrome.runtime.connect(extensionId);
        port.postMessage({ command: 'downloadTorrent', data: { torrent: torrent } });
        port.onMessage.addListener(function(res) {
          if(!res.torrent) {
            deferred.reject({ error: 'No torrent!' });
          } else {
            deferred.resolve(res.torrent);
          }
        });

        return deferred.promise;
      }
    }
})();
