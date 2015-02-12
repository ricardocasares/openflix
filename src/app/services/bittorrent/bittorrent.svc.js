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
        startDownload: startDownload
      };

      return service;

      ///////////////

      /**
       * starts a torrent download
       * @param  {String} hash Torrent download URL or magnet URI
       */
      function startDownload(torrent) {
        return instance.startDownload(torrent);
      }
    }
})();
