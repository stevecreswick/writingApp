angular.module('writeAway').directive(
  'post',
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
