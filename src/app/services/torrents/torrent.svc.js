(function() {
  'use strict';
  angular
    .module('of.services.torrents', [
      'of.services.torrents.yts',
      'ngStorage',
    ])
    .service('TorrentSvc', TorrentSvc);

  /**
   * Fake movie API service
   * @type {Object}
   */
  TorrentSvc.$inject = ['YtsTorrentSvc', '$localStorage'];

  function TorrentSvc(YtsTorrentSvc, $localStorage) {

    var instance = YtsTorrentSvc;

    /**
     * service object
     * @type {Object}
     */
    var service = {
      getTorrentsByMovieId: getTorrentsByMovieId,
    };

    return service;

    //////////////

    /**
     * returns a torrent object for
     * a given torrent id
     * @param  {String} id movie imdb id
     * @return {Object}    Torrent object
     */
    function getTorrentsByMovieId(id) {
      return instance.getTorrentsByMovieId(id);
    }

  }
})();
