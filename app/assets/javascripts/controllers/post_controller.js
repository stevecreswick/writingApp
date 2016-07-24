angular.module('writeAway')
  .controller(
    'PostController', [
    '$scope', 'Post', '$sce',
    function( $scope, Post, $sce ){

      $scope.postData = $scope.$parent.post.data;

      $scope.convertMessage = function() {
        return $sce.trustAsHtml( $scope.postData.message );
      };

      $scope.postOpen = false;

      $scope.togglePostOpen = function () {
        $scope.postOpen = !$scope.postOpen;

        if ( $scope.postOpen ) {
          Post.getCritiques( $scope.postData.id, $scope.apiPage ).
            then(
              function ( critiques ) {
                $scope.critiques = critiques.data;
              },
              function ( error ) {
                  $scope.status = 'Unable to load critiques: ' + error.message;
                }
            );
        }
      }
    }
  ]
);
