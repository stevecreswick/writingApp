angular.module('writeAway')
  .controller(
    'PostController', [
    '$scope', 'Post', '$sce', '$rootScope',
    function( $scope, Post, $sce, $rootScope ){

      $scope.originalPost = angular.copy( $scope.post );
      $scope.postData = $scope.post.data;
      $scope.critiques = [];

      // $scope.currentPage is inherited from the ApplicationController

      $scope.convertMessage = function( post ) {
        return $sce.trustAsHtml( $scope.postData.message );
      };

      $scope.postOpen = false;

      $scope.togglePostOpen = function () {
        $scope.postOpen = !$scope.postOpen;

        if ( $scope.postOpen ) {
          $scope.fetchCritiques();
        }
      }

      $scope.fetchCritiques = function() {
        Post.getCritiques( $scope.postData.id, $scope.currentPage ).
          then(
            function ( critiques ) {
              $scope.critiques = critiques.data;
            },
            function ( error ) {
                $scope.status = 'Unable to load critiques: ' + error.message;
              }
          );
      }

      $scope.submitEditedPost = function(){
        Post.updatePost( $scope.postData ).then(
          function(){
            $scope.$broadcast( 'postUpdated' );
          }
        );
      }

      $scope.deletePost = function( index ) {
        Post.deletePost( $scope.postData ).then(
          function( success ){
            $scope.togglePostOpen();
            $rootScope.removeModel( $scope.posts, index );
          },
          function( error ){
            console.log( error );
          }
        );
      }

      $scope.$on(
        'editCanceled',
        function ( event, args ) {
          if ( $scope.postData.message !== $scope.originalPost.data.message ) {
            $scope.postData.message = $scope.originalPost.data.message;
          }
        }
      );
    }
  ]
);
