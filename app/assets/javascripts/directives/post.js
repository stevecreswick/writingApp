angular.module('writeAway').directive(
  'post',
  [
    '$sce',
    function( $sce ) {
      return {
        replace: true,
        restrict: 'EA',
        link: function( scope, element, attrs ) {
          scope.editing = false;
          scope.deleting = false;

          scope.toggleEdit = function() {
            scope.editing = !scope.editing;
          }

          scope.toggleDelete = function() {
            scope.deleting = !scope.deleting;
          }

          scope.$on(
            'postUpdated',
            function ( event, args ) {
              scope.toggleEdit();
            }
          );
        }
      }
    }
  ]
);
