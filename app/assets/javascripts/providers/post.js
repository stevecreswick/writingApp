angular.module('writeAway')
  .factory(
    'Post', [
      '$http',
      function( $http ) {
        var urlBase = '/api/posts';

        var postFactory = {};

        postFactory.getPosts = function ( page ) {
          return $http.get( urlBase + '/' + page );
        };

        postFactory.getPost = function (id) {
          return $http.get(urlBase + '/' + id);
        };

        postFactory.insertPost = function ( post ) {
          return $http.post(urlBase, cust);
        };

        postFactory.updatePost = function ( post ) {
          return $http.put(urlBase + '/' + post.id, post)
        };

        postFactory.deletePost = function ( post ) {
          return $http.delete(urlBase + '/' + post.id );
        };

        postFactory.getCritiques = function ( id, page ) {
          return $http.get(urlBase + '/' + id + '/critiques/query/' + page);
        };

        return postFactory;
    }
  ]
);
