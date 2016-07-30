angular.module('writeAway')
  .controller(
    'CritiqueController', [
    '$scope', 'Critique', '$sce', 'Vote',
    function( $scope, Critique, $sce ){
      $scope.critiqueData = $scope.$parent.critique;

      $scope.updateCritique = function() {
        var urlOptions = {
          'id': $scope.critiqueData.id,
          'post_id': $scope.critiqueData.post_id
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

      $scope.confirmCritiqueDelete = function() {
        console.log('confirming');
      }
    }
  ]
);
