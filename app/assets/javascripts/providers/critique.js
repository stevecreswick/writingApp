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

        Critique.getCritique = function ( critique ) {
          return $http.get( urlBase( critique ) );
        };

        Critique.insertCritique = function ( critique ) {
          return $http.post( urlBase( critique ), critique );
        };

        Critique.updateCritique = function ( critique ) {
          return $http.put( urlBase( critique ), critique);
        };

        Critique.deleteCritique = function ( critique ) {
          return $http.delete( urlBase( critique ) );
        };

        return Critique;
    }
  ]
);
