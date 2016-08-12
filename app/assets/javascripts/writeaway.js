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
    $routeProvider.
      when('/',
        {
          templateUrl:'assets/templates/index.html',
          controller: 'HomeController'
        } ).
        when('/write',
          {
            templateUrl:'assets/templates/writing/writing-page.html',
            controller: 'WritingPageController'
          } ).
      otherwise(
        {
          templateUrl:'assets/templates/index.html',
          controller: 'HomeController'
        }
      );
    }
  ]
);
