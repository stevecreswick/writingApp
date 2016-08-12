angular.module('writeAway')
  .factory(
    'Prompt', [
      '$http',
      function( $http ) {
        var urlBase = '/api/prompts';

        var promptFactory = {};

        promptFactory.getPrompts = function ( page ) {
          return $http.get( urlBase + '/' + page );
        };

        promptFactory.getPrompt = function ( id ) {
          return $http.get( urlBase + '/' + id );
        };

        promptFactory.randomPrompt = function () {
          return $http.get( urlBase );
        };

        promptFactory.insertPrompt = function ( prompt ) {
          return $http.post( urlBase, prompt );
        };

        promptFactory.updatePrompt = function ( prompt ) {
          return $http.put( urlBase + '/' + prompt.id, prompt )
        };

        promptFactory.deletePrompt = function ( prompt ) {
          return $http.delete(urlBase + '/' + prompt.id );
        };

        return promptFactory;
    }
  ]
);
