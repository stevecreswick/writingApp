angular.module('writeAway')
  .controller(
  'NewPostController',
  [
    '$scope', '$rootScope', 'Stopwatch',
    function( $scope, $rootScope, Stopwatch ) {
      console.log($scope.writingPrompt);

      $scope.timeElapsed = Stopwatch;
      $scope.timeElapsed.start();

    }
  ]
);
