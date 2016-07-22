angular.module('writeAway')
  .controller(
    'PostController', [
    '$scope', 'Post', '$sce',
    function( $scope, Post, $sce ){

      $scope.postMessage = $scope.$parent.post.data.message;

      $scope.convertMessage = function() {
        return $sce.trustAsHtml( $scope.postMessage );
      };

      $scope.postOpen = false;

      $scope.togglePostOpen = function () {
        $scope.postOpen = !$scope.postOpen;
      }

    }
  ]
);
