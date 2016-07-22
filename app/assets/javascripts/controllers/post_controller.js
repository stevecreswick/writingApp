angular.module('writeAway')
  .controller(
    'PostController', [
    '$scope', 'Post', '$sce',
    function( $scope, Post, $sce ){

      $scope.snippet = $scope.$parent.post.data.message;

      $scope.convertMessage = function() {
        return $sce.trustAsHtml( $scope.snippet );
      };

    }
  ]
);
