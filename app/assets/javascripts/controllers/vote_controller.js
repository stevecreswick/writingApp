angular.module('writeAway')
  .controller(
    'VoteController', [
    '$scope', 'Vote',
    function( $scope, Vote ){
      var userVoted = ( $scope.critiqueData.user_id == $scope.currentUser.id );

      var newVote = function( vote ) {
        Vote.insertVote( vote ).then(
          function( success ) {
            $scope.updateCritique();
          },
          function( error ) {
            console.log( error );
          }
        );
      }

      var editVote = function( vote ) {
        Vote.updateVote( vote ).then(
          function( success ) {
            $scope.updateCritique();
          },
          function( error ) {
            console.log( error );
        });
      }

      $scope.submitVote = function( value ) {
        var vote = {
          'postId': $scope.critiqueData.post_id,
          'critiqueId': $scope.critiqueData.id,
          'value': value
        }

        userVoted ?
          newVote( vote ) :
          editVote( vote );
      }
    }
  ]
);
