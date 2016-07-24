angular.module('writeAway')
  .factory(
    'Post', [
      '$http',
      function( $http ) {
        var urlBase = '/api/posts';

        var postFactory = {};

        postFactory.getPosts = function (page) {
            return $http.get(urlBase + '/' + 0);
        };

        postFactory.getPost = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        postFactory.insertPost = function ( post ) {
            return $http.post(urlBase, cust);
        };

        postFactory.updatePost = function ( post ) {
            return $http.put(urlBase + '/' + post.ID, post)
        };

        postFactory.deletePost = function ( id ) {
            return $http.delete(urlBase + '/' + id);
        };

        postFactory.getCritiques = function ( id, page ) {
            return $http.get(urlBase + '/' + id + '/critiques/query/' + page);
        };

        return postFactory;
    }
  ]
);
