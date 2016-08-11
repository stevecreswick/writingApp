angular.module('writeAway')
  .controller(
    'CritiqueFeedController', [
    '$scope', 'Critique', '$sce',
    function( $scope, Critique, $sce ){

      // From Application Controller
        // $scope.currentUser

      // From Post Controller
        // $scope.post.data
        // $scope.critiques
        // $scope.fetchCritiques()

      $scope.newCritique = {
        'post_id': $scope.post.data.id,
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
