console.log('angular module loaded');

angular.module(
  'writeAway',
  [ 'ngRoute',
    'ngSanitize'
  ]
).
config(
  [
    '$routeProvider',
    '$locationProvider',
    function( $routeProvider, $locationProvider ) {
    $routeProvider
      .when('/',
      {
        templateUrl:'assets/templates/index.html',
        controller: 'HomeController'
      } )
      .otherwise({
        templateUrl:'assets/templates/index.html',
        controller: 'HomeController'
      });
    }
  ]
);
