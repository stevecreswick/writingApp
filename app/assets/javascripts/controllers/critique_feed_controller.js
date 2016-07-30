angular.module('writeAway')
  .controller(
    'CritiqueFeedController', [
    '$scope', 'Critique', '$sce',
    function( $scope, Critique, $sce ){

      // From Application Controller
        // $scope.currentUser

      // From Post Controller
        // $scope.postData
        // $scope.critiques
        // $scope.fetchCritiques()

      $scope.newCritique = {
        'post_id': $scope.postData.id,
        'user_id': $scope.currentUser.id,
        'message': ''
      };

      $scope.createCritique = function() {
        Critique.insertCritique( $scope.newCritique ).then(
          function( success ) {
            $scope.fetchCritiques();
          },
          function( error ) {
            console.log( error );
          }
        );
      }
    }
  ]
);
