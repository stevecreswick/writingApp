angular.module('writeAway')
  .controller(
    'PostFeedController', [
    '$scope', 'Post',
    function( $scope, Post ){


      function getPosts() {
        Post.
          getPosts().
          then(
            function ( posts ) {
              $scope.posts = posts.data;
            },
            function ( error ) {
                $scope.status = 'Unable to load posts: ' + error.message;
              }
          );
      }

      getPosts();

    }
  ]
);
