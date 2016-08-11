console.log('loaded appplicat');

angular.module('writeAway')
  .controller(
    'ApplicationController',
    [
      '$scope', 'User', '$rootScope',
      function( $scope, User, $rootScope ){

        $scope.currentPage = 1;

        User.getUser(
          parseInt(
            document.
            getElementById(
              'current_id'
            ).value
          )
        ).
        then(
          function ( user ) {
            $scope.currentUser = user.data;
          },
          function ( error ) {
              $scope.status = 'Unable to load user: ' + error.message;
            }
        );

        $rootScope.removeModel = function( array, index ) {
          array.splice( index, 1 );
        }
      }
    ]
  );
