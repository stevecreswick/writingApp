angular.module('writeAway')
  .factory(
    'Critique',
    [
      '$http',
      function( $http ) {
        var urlBase = '/api/posts';

        var Critique = {};

        Critique.getPosts = function (page) {
            return $http.get(urlBase + '/' + 0);
        };

        Critique.getPost = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        Critique.insertPost = function (cust) {
            return $http.post(urlBase, cust);
        };

        Critique.updatePost = function (cust) {
            return $http.put(urlBase + '/' + cust.ID, cust);
        };

        Critique.deletePost = function (id) {
            return $http.delete(urlBase + '/' + id);
        };

        return Critique;
    }
  ]
);
