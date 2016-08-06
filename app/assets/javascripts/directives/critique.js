angular.module('writeAway').directive(
  'critique',
  [
    '$sce',
    function( $sce ) {
      return {
        replace: true,
        restrict: 'EA',
        link: function( scope, element, attrs ) {

          scope.cancelCritiqueEdit = function() {
            scope.cancelingCritiqueEdit = !scope.cancelingCritiqueEdit;
            scope.editingCritique = !scope.editingCritique;

            scope.$emit( 'critiqueEditCanceled' );
          };

          scope.toggleCritiqueEdit = function() {
            scope.editingCritique = !scope.editingCritique;
          };

          scope.toggleCritiqueDelete = function() {
            scope.deletingCritique = !scope.deletingCritique;
          };

          scope.confirmCritiqueEditCancel = function() {
            scope.cancelingCritiqueEdit = !scope.cancelingCritiqueEdit;
          };

          scope.$on(
            'critiqueUpdated',
            function ( event, args ) {
              scope.toggleCritiqueEdit();
            }
          );
        }
      }
    }
  ]
);
