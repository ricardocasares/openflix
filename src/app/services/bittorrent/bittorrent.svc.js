(function(){
  'use strict';

  /**
  * $ngdoc interface
  * @name of.services.bittorrent
  */
  angular
    .module('of.services.bittorrent', [
      'of.services.bittorrent.chrome'
    ])
    .service('BitTorrentSvc', BitTorrentSvc);

    BitTorrentSvc.$inject = ['ChromeTorrentSvc'];
    function BitTorrentSvc (ChromeTorrentSvc) {

      var instance = ChromeTorrentSvc;

      var service = {
        startTorrent: startTorrent,
        stopTorrent: stopTorrent
      };

      return service;

      ///////////////

      /**
       * starts a torrent download
       * @param  {String} hash Torrent download URL or magnet URI
       */
      function startTorrent(torrent) {
        return instance.startTorrent(torrent);
      }

      function stopTorrent() {
        return instance.stopTorrent();
      }
    }
})();
