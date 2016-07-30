angular.module('writeAway')
  .controller(
    'CritiqueController', [
    '$scope', 'Critique', '$sce', 'Vote',
    function( $scope, Critique, $sce, Vote ){
      $scope.critiqueData = $scope.$parent.critique;
      var userVoted = ( $scope.critiqueData.user_id == $scope.currentUser.id );

      var updateCritique = function( urlOptions ) {
        var urlOptions = {
          id: $scope.critiqueData.id,
          postId: $scope.critiqueData.post_id
        }

        Critique.getCritique( urlOptions ).then(
          function( success ){
            $scope.critiqueData = $scope.$parent.critique = success.data
          },
          function( error ){
            console.log( error );
          }
        );
      }

      var newVote = function( value ) {
        var vote = {
          'postId': $scope.critiqueData.post_id,
          'critiqueId': $scope.critiqueData.id,
          'value': value
        }

        Vote.insertVote( vote ).then(
          function( success ) {
            updateCritique();
          },
          function( error ) {
            console.log( error );
          }
        );
      }

      var editVote = function( value ) {
        var vote = {
          'postId': $scope.critiqueData.post_id,
          'critiqueId': $scope.critiqueData.id,
          'value': value
        }

        Vote.updateVote( vote ).then(
          function( success ) {
            updateCritique();
          },
          function( error ) {
            console.log( error );
        });
      }

      $scope.submitVote = function( value ) {
        userVoted ?
          newVote( value ) :
          editVote( value );
      }
    }
  ]
);
