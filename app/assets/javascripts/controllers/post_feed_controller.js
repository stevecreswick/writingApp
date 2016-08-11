angular.module('writeAway')
  .controller(
    'PostFeedController', [
    '$scope', 'Post',
    function( $scope, Post ){
      $scope.page = 1;
      $scope.morePostsAvailable = true;

      function getPosts( page ) {
        Post.
          getPosts( page ).
          then(
            function ( posts ) {
              $scope.posts = posts.data;
            },
            function ( error ) {
                $scope.status = 'Unable to load posts: ' + error.message;
              }
          );
      }

      $scope.seeMorePosts = function() {
        $scope.page = $scope.page + 1;
        console.log('querying page ', $scope.page );

        Post.
          getPosts( $scope.page ).
          then(
            function ( posts ) {

              // Refactor if-statement to account for queries with less than 20 responses
              if ( posts.data.length < 20 ) {
                $scope.morePostsAvailable = false;
              }

              for ( var i = 0; i < posts.data.length; i++ ) {
                  $scope.posts.push( posts.data[ i ] );
              }
            },
            function ( error ) {
                $scope.status = 'Unable to load posts: ' + error.message;
              }
            );
      };



      getPosts( $scope.page );

    }
  ]
);
