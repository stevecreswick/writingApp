console.log('loaded appplicat');

angular.module('writeAway')
  .controller(
    'ApplicationController', [
    '$scope',
    function( $scope ){

      $scope.apiPage = 0;
      $scope.currentPage = $scope.apiPage + 1;


  }]);
