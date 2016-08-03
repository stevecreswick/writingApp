angular.module('writeAway').directive(
  'critique',
  [
    '$sce',
    function( $sce ) {
      return {
        replace: true,
        restrict: 'EA',
        link: function( scope, element, attrs ) {


          scope.toggleCritiqueDelete = function() {
            console.log('toggling delete');
            scope.deletingCritique = !scope.deletingCritique;
          };
        }
      }
    }
  ]
);
