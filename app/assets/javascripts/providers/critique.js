angular.module('writeAway')
  .factory(
    'Critique',
    [
      '$http',
      function( $http ) {
        var urlBase = function( options ) {
          var urlBase = '/api/posts/' + options.post_id + '/critiques';

          if ( options.id ) {
            return urlBase + '/' + options.id
          }
          else {
            return urlBase;
          }
        };

        var Critique = {};

        Critique.getCritiques = function ( page ) {
          return $http.get( urlBase + '/' + 0 );
        };

        Critique.getCritique = function ( options ) {
          return $http.get( urlBase( options ) );
        };

        Critique.insertCritique = function ( critique ) {
          return $http.post( urlBase( critique ), critique );
        };

        // Critique.updatePost = function (cust) {
        //   return $http.put(urlBase + '/' + cust.ID, cust);
        // };
        //
        Critique.deleteCritique = function ( critique ) {
          return $http.delete( urlBase( critique ) );
        };

        return Critique;
    }
  ]
);
