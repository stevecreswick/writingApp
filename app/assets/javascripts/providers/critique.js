angular.module('writeAway')
  .factory(
    'Critique',
    [
      '$http',
      function( $http ) {
        var urlBase = function( options ) {
          return '/api/posts/' + options.postId +
                 '/critiques/' + options.id;
        };

        var Critique = {};

        // Critique.getPosts = function (page) {
        //   return $http.get(urlBase + '/' + 0);
        // };
        //
        Critique.getCritique = function ( options ) {
          return $http.get( urlBase( options ) );
        };
        //
        // Critique.insertPost = function (cust) {
        //   return $http.post(urlBase, cust);
        // };
        //
        // Critique.updatePost = function (cust) {
        //   return $http.put(urlBase + '/' + cust.ID, cust);
        // };
        //
        // Critique.deletePost = function (id) {
        //   return $http.delete(urlBase + '/' + id);
        // };

        return Critique;
    }
  ]
);
