angular.module('writeAway')
  .controller(
    'NavigationController', [
    '$scope', '$location', '$rootScope',
    function( $scope, $location, $rootScope ){

      $rootScope.navigate = function( slug ) {
        var slug = slug ? slug : '/users/main';

        $location.path( slug );
      };
    }
  ]
);
