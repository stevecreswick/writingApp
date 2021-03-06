var app = app || {};

app.WritingPageNavbar = Backbone.View.extend({
  tagName: 'div',

  events: {
  },

  initialize: function() {
  },

  getPromptInstruction: function(options){

    if (options.type === "Start My Sentences") {
      return "Write at least " + options.wordCount + " words.  A Period and Space will give you a random word.";
    } else if (options.type === "reddit") {
      return "Write at least " + options.wordCount + " words, using the /r/writingprompt";
    } else if (options.type === "Classic First Sentence") {
      return "Write at least " + options.wordCount + " words, using the classic first sentence";
    } else if (options.type === "Answer What If") {
      return "Write at least " + options.wordCount + " words, answering what if";
    } else {

    }

    app.requiredWords = options.wordCount;
  },

  bindPromptDescription: function(){
    var scope = this;
    $( "#choose-type" ).change(function() {
      scope.changePromptDescription( $('#choose-type').val() );
    });

  }
});
