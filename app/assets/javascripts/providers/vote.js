angular.module('writeAway')
  .factory(
    'Vote', [
      '$http',
      function( $http ) {

        function urlBase( vote ) {
          var urlBase = '/api/posts/' + vote.postId +
                        '/critiques/' + vote.critiqueId +
                        '/votes/';

          console.log('url base ', urlBase);
          return urlBase;
        }

        var Vote = {};

        // Vote.getVotes = function (page) {
        //   return $http.get(urlBase + '/' + 0);
        // };
        //
        // Vote.getVote = function (id) {
        //   return $http.get(urlBase + '/show/' + id);
        // };

        Vote.insertVote = function ( vote ) {
          return $http.post( urlBase( vote ), vote );
        };

        Vote.updateVote = function ( vote ) {
          return $http.put( urlBase( vote ), vote)
        };

        // Vote.deleteVote = function ( id ) {
        //   return $http.delete(urlBase + '/' + id);
        // };

        return Vote;
    }
  ]
);
