console.log('loaded home');

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

        postFactory.insertPost = function (cust) {
            return $http.post(urlBase, cust);
        };

        postFactory.updatePost = function (cust) {
            return $http.put(urlBase + '/' + cust.ID, cust)
        };

        postFactory.deletePost = function (id) {
            return $http.delete(urlBase + '/' + id);
        };

        postFactory.getCritiques = function (id) {
            return $http.get(urlBase + '/' + id + '/critiques');
        };

        return postFactory;
    }
  ]
);
