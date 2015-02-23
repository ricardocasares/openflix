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

      return function() {
        var torrent;
        var extensionId = 'jpnedpmdignaapkiedicefekhfnmnnjp';
        var port = chrome.runtime.connect(extensionId);

        this.startTorrent = function(torrent) {
          port.postMessage({ command: 'downloadTorrent', data: { torrent: torrent }});
        };

        this.stopTorrent = function() {
          port.postMessage({ command: 'stopTorrent', data: {} });
        };

        this.responseHandler = function(res) {

        };
      };

      ///////////////

      function startTorrent(torrent) {

        var deferred = $q.defer();
        port = chrome.runtime.connect(extensionId);
        port.postMessage({ command: 'downloadTorrent', data: { torrent: torrent } });
        port.onMessage.addListener(messageHandler);
        function(res) {
          if(!res.torrent) {
            deferred.reject({ error: 'No torrent!' });
          } else {
            $interval(function() {
              getTorrent();
            }, 2000);
            deferred.resolve(res.torrent);
          }
        });

        return deferred.promise;
      }

      function responseHandler(res) {
        commands[res.command](res.data);
      }

      function stopTorrent() {
        if(port) {
          port.postMessage({ command: 'removeTorrent' });
        }
      }

      function getTorrent() {
        if(torrent) {
          return torrent;
        }
      }
    }
})();
