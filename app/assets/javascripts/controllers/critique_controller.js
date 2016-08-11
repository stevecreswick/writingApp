angular.module('writeAway')
  .controller(
    'CritiqueController', [
    '$scope', 'Critique', '$sce', 'Vote', '$rootScope',
    function( $scope, Critique, $sce, $rootScope ){
      $scope.originalCritique = angular.copy( $scope.$parent.critique );
      $scope.critiqueData = $scope.$parent.critique;

      $scope.updateCritique = function() {
        var urlOptions = {
          'id': $scope.critiqueData.id,
          'post_id': $scope.critiqueData.post_id
        }

        Critique.getCritique( urlOptions ).then(
          function( success ){
            $scope.critiqueData = $scope.$parent.critique = success.data;
          },
          function( error ){
            console.log( error );
          }
        );
      }

      $scope.deleteFeedback = function( index ) {
        Critique.deleteCritique( $scope.critiqueData ).then(
          function( success ){
            $rootScope.removeModel( $scope.critiques, index );
          },
          function( error ){
            console.log( error );
          }
        );
      }

      $scope.submitEditedCritique = function(){
        Critique.updateCritique( $scope.critiqueData ).then(
          function( success ){
            $scope.$broadcast( 'critiqueUpdated' );
          },
          function( error ) {
            console.log( error );
          }
        );
      }

      $scope.$on(
        'critiqueEditCanceled',
        function ( event, args ) {
          if ( $scope.critiqueData.message !== $scope.originalCritique.message ) {
            $scope.critiqueData.message = $scope.originalCritique.message;
          }
        }
      );
    }
  ]
);
