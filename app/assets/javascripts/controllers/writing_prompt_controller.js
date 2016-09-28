angular.module('writeAway')
  .controller(
    'WritingPromptController', [
    '$scope', '$rootScope', 'Prompt',
    function( $scope, $rootScope, Prompt ){
      $scope.wordCount = 100;
      $scope.writingPost = false;
      $scope.promptTypes = [
        { 'name': 'any', 'value': 'Any' },
        { 'name': 'start-my-sentences', 'value': 'Start My Sentences' },
        { 'name': 'answer-what-if', 'value': 'Answer What If' },
        { 'name': 'classic-first-sentence', 'value': 'Classic First Sentence' },
        { 'name': 'reddit', 'value': 'Reddit' }
      ];

      $scope.currentPromptType = $scope.promptTypes[ 0 ];

      $scope.promptDescription = {
        'any': '',
        'start-my-sentences': 'Write a story using a random word to start each sentence.  Typing a period and space will generate a new word.',
        'answer-what-if': 'Write a story surrounding a \'what if\' statement',
        'classic-first-sentence': 'Write a story starting with the first sentence of a classic novel.',
        'reddit': 'Answer a random prompt submitted to /r/writingprompts.'
      };

      $scope.getPrompt = function() {
        Prompt.
          randomPrompt().
          then(
            function ( prompt ) {
              $scope.writingPrompt = prompt.data;
            },
            function ( error ) {
                $scope.status = 'Unable to load prompt: ' + error.message;
              }
          );
      };

      $scope.getPromptList = function() {
        Prompt.
          getPrompts( $scope.promptPage ).
          then(
            function ( prompt ) {
              $scope.writingPrompt = prompt.data;
            },
            function ( error ) {
                $scope.status = 'Unable to load prompt: ' + error.message;
              }
          );
      };

      $scope.startWriting = function() {
        $scope.writingPost = !$scope.writingPost;
      };
    }
  ]
);
