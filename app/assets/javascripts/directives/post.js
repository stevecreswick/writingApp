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
          scope.cancelingEdit = false;

          scope.toggleDelete = function() {
            scope.deleting = !scope.deleting;
          };

          scope.toggleEdit = function() {

            if ( scope.editing ) {
              scope.confirmCancel();
            }
            else if ( !scope.editing ) {
              scope.editing = !scope.editing;
            }
          }

          scope.confirmCancel = function() {
            scope.cancelingEdit = !scope.cancelingEdit;
          };

          scope.cancelEdit = function() {
            scope.cancelingEdit = !scope.cancelingEdit;
            scope.editing = !scope.editing;

            scope.$emit( 'editCanceled' );
          };

          scope.$on(
            'postUpdated',
            function ( event, args ) {
              scope.editing = !scope.editing;
            }
          );
        }
      }
    }
  ]
);
