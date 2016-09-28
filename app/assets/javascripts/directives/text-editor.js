angular.module('writeAway').directive(
  'textEditor',
  [
    '$sce', 'Quill',
    function( $sce, Quill ) {
      return {
        replace: true,
        restrict: 'EA',
        link: function( scope, element, attrs ) {

          var editor = new Quill( element[ 0 ] );

        }
      }
    }
  ]
);
