angular.module('writeAway').directive(
  'critique',
  [
    '$sce',
    function( $sce ) {
      return {
        replace: true,
        restrict: 'EA',
        link: function( scope, element, attrs ) {

        }
      }
    }
  ]
);
