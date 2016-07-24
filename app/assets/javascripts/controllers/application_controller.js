console.log('loaded appplicat');

angular.module('writeAway')
  .controller(
    'ApplicationController',
    [
      '$scope', 'User',
      function( $scope, User ){

        $scope.apiPage = 0;
        $scope.currentPage = $scope.apiPage + 1;

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
            console.log($scope.currentUser);
          },
          function ( error ) {
              $scope.status = 'Unable to load user: ' + error.message;
            }
        );
      }
    ]
  );
