angular.module('writeAway')
  .controller(
    'CritiqueController', [
    '$scope', 'Critique', '$sce',
    function( $scope, Critique, $sce ){
      $scope.critiqueData = $scope.$parent.critique;
    }
  ]
);
