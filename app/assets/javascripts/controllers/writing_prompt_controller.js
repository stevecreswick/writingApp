angular.module('writeAway')
  .controller(
    'WritingPromptController', [
    '$scope', '$rootScope', 'Prompt',
    function( $scope, $rootScope, Prompt ){
      $scope.wordCount = 100;
      $scope.promptType = 'Start My Sentences';
      $scope.description = {
        'Start My Sentences': 'Write a story using a random word to start each sentence.  Typing a period and space will generate a new word.'
      };

      $scope.getPrompt = function() {
        Prompt.
          randomPrompt().
          then(
            function ( prompt ) {
              console.log(prompt);
              $scope.writingPrompt = prompt.data;
            },
            function ( error ) {
                $scope.status = 'Unable to load prompt: ' + error.message;
              }
          );
      };
    }
  ]
);
