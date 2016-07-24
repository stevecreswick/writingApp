angular.module('writeAway')
  .factory(
    'User', [
      '$http',
      function( $http ) {
        var urlBase = '/api/users';

        var User = {};

        User.getUsers = function (page) {
            return $http.get(urlBase + '/' + 0);
        };

        User.getUser = function (id) {
            return $http.get(urlBase + '/show/' + id);
        };

        User.insertUser = function ( user ) {
            return $http.post(urlBase, cust);
        };

        User.updateUser = function ( user ) {
            return $http.put(urlBase + '/' + user.ID, user)
        };

        User.deleteUser = function ( id ) {
            return $http.delete(urlBase + '/' + id);
        };

        return User;
    }
  ]
);
